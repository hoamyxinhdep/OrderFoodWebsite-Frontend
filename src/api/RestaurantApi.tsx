import { SearchState } from "@/pages/SearchPage";
import { Reply, Restaurant, RestaurantSearchResponse, Review } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

export const useGetReviews = (restaurantId?: string) => {
  const getReviewByRestaurantId = async (): Promise<Review[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/review/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get review");
    }

    return response.json();
  };

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery("fetchReview", getReviewByRestaurantId);

  return { reviews, isLoading, refetch };
};

// export const useCreateReviews = (restaurantId?: string) => {
//   const { getAccessTokenSilently } = useAuth0();
//   const createReview = async (comment: FormData): Promise<Review[]> => {
//     const accessToken = await getAccessTokenSilently();
//     const commentJson = Object.fromEntries(comment.entries());
//     const response = await fetch(`${API_BASE_URL}/api/review/${restaurantId}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(commentJson),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create review");
//     }

//     return response.json();
//   };

//   const {
//     mutate: createComment,
//     isLoading,
//     error,
//   } = useMutation(createReview);

//   if (error) {
//     toast.error("Unable to post comment");
//   }

//   return { createComment, isLoading };
// };

export const useCreateUpdateReview = (restaurantId?: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const updateReview = async (comment: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const commentJson = Object.fromEntries(comment.entries());
    const response = await fetch(
      `${API_BASE_URL}/api/review/restaurants/${restaurantId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentJson),
      }
    );

    if (!response) {
      throw new Error("Failed to create comment");
    }

    return response.json();
  };

  const { mutate: createComment, isLoading} = useMutation(updateReview);

  return { createComment, isLoading };
};

export const useCreateReply = (commentId?: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const createReply = async (text: FormData): Promise<Reply[]> => {
    const accessToken = await getAccessTokenSilently();
    const commentJson = Object.fromEntries(text.entries());
    const response = await fetch(`${API_BASE_URL}/api/review/reply/${commentId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentJson),
    });

    if (!response.ok) {
      throw new Error("Failed to create reply");
    }

    return response.json();
  };

  const {
    mutate: createReplies,
    isLoading,
    error,
  } = useMutation(createReply);

  if (error) {
    toast.error("Unable to post reply");
  }

  return { createReplies, isLoading };
};


export const useDeleteReviews = (commentId?: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const deleteReview = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/review/delete/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
    );

    if (!response) {
      throw new Error("Failed to delete comment");
    }

    return response.json();
  };

  const {
    mutate: deleteComment,
    isLoading,
    error,
  } = useMutation(deleteReview);

  if (error) {
    toast.error("Unable to delete comment");
  }

  return {deleteComment, isLoading };
};