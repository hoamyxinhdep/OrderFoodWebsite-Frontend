import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType, Review } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import RestaurantInfo from "@/components/RestaurantInfo";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import ListReview from "@/components/ListReview";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
const Reviewlist: Review[] = [
  {
    avatar: "abc",
    name: 'A',
    date: "7/1/2024",
    cmt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eligendi, ipsum nemo deserunt cumque explicabo possimus, odio illum labore enim eius reprehenderit debitis! Exercitationem molestias amet ad vel provident eius!,"
  },
  {
    avatar: "abc",
    name: 'B',
    date: "7/1/2024",
    cmt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eligendi, ipsum nemo deserunt cumque explicabo possimus, odio illum labore enim eius reprehenderit debitis! Exercitationem molestias amet ad vel provident eius!,",
  },
  {
    avatar: "abc",
    name: 'C',
    date: "7/1/2024",
    cmt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eligendi, ipsum nemo deserunt cumque explicabo possimus, odio illum labore enim eius reprehenderit debitis! Exercitationem molestias amet ad vel provident eius!,",
  },
];
const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div>
      <div className="flex flex-col gap-10">
        <AspectRatio ratio={16 / 5}>
          <img
            src={restaurant.imageUrl}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
          <div className="flex flex-col gap-4">
            <RestaurantInfo restaurant={restaurant} />
            <span className="text-2xl font-bold tracking-tight">Menu</span>
            {restaurant.menuItems.map((menuItem) => (
              <MenuItem
                menuItem={menuItem}
                addToCart={() => addToCart(menuItem)}
              />
            ))}
          </div>
          <div>
            <Card>
              <OrderSummary
                restaurant={restaurant}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
              />
              <CardFooter>
                <CheckoutButton
                  disabled={cartItems.length === 0}
                  onCheckout={onCheckout}
                  isLoading={isCheckoutLoading}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="md:px-32">
        <div className="flex flex-col gap-4 mt-4">
          <span className="text-2xl font-bold tracking-tight">Review</span>
          <div>
            {Reviewlist.map((review, index) => (
              <ListReview key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
      <div className="md:px-32">
        <div className="flex flex-col gap-4 mt-4">
          <textarea
            className="border rounded p-2"
            placeholder="Input your comment here"
            style={{ resize: "none" }}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
