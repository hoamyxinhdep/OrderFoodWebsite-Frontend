import { Button } from "./ui/button";

const ContactUs = () => {
  return (
    <div className="mx-[120px] py-20">
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="flex flex-col gap-10">
          <h3 className="font-bold text-2xl leading-normal md:text-[26px] lg:text-[30px] xl:text-[32px]">
            Chúng tôi sẽ rất vui khi được nghe ý kiến của bạn
          </h3>
          <div className="flex flex-col gap-6">
            <form className="space-y-4">
              <div className="form-control">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên
                </label>
                <textarea
                  id="name"
                  className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="form-control">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <textarea
                  id="email"
                  className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="form-control">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tiêu đề
                </label>
                <textarea
                  id="subject"
                  className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="form-control">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nhập tin nhắn của bạn ở đây
                </label>
                <textarea
                  id="message"
                  className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </form>
          </div>
          <div>
            <Button size="lg" variant="default">
              Gửi ngay
            </Button>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.856168121188!2d108.25831637480982!3d15.968885884696146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2zxJDhuqFpIGjhu41jIEZQVCDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1714191687006!5m2!1svi!2s"
          width="100%"
          height="560"
          className="shadow-md rounded-2xl"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ Google"
        />
      </div>
    </div>
  );
};

export default ContactUs;
