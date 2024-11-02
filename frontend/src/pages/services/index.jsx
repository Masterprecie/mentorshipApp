import { services } from "../../utils/data";

const Services = () => {
  return (
    <div className="w-[90%] mx-auto py-10">
      <div className="text-center font-bold pb-5 text-2xl">Services</div>

      <div className="md:grid grid-cols-2 gap-5">
        {services.map((data) => {
          const { id, img, title, content } = data;
          return (
            <div
              key={id}
              className="md:grid grid-cols-2 gap-5 rounded-md shadow-md p-3 border"
            >
              <div>
                <img src={img} className="w-full h-full object-cover" />
              </div>

              <div className="text-blue-900">
                <h1 className="font-extrabold">{title}</h1>
                <p>{content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
