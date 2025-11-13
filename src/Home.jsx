import React from "react";
import { Link, useLoaderData } from "react-router";

const Home = () => {
  const crop = useLoaderData();
  const crops = crop.slice(-6);

  console.log(crops);
  return (
    <div>
      <div className="carousel w-full relative">
        <div id="item1" className="carousel-item w-full">
          <img src="/1.jpg" className="w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent text-white p-6 md:p-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              Farm-Fresh Wholegrain
            </h2>

            <p className="text-base md:text-lg">
              Experience the taste of nature with our hand-picked, organic
              produce straight from local farms.
            </p>
          </div>
        </div>

        <div id="item2" className="carousel-item w-full relative">
          <img src="/2.jpg" className="w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent text-white p-6 md:p-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              Sweet & Refreshing Fruits
            </h2>

            <p className="text-base md:text-lg">
              From orchards to your table – enjoy a burst of flavor with our
            </p>
          </div>
        </div>

        <div id="item3" className="carousel-item w-full relative">
          <img src="/3.jpg" className="w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent text-white p-6 md:p-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              Healthy oil for a Healthy Life
            </h2>

            <p className="text-base md:text-lg">
              Discover nutrient-rich oil, responsibly sourced for your
              well-being and a sustainable future.
            </p>
          </div>
        </div>

        <div id="item4" className="carousel-item w-full relative">
          <img src="/4.jpg" className="w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent text-white p-6 md:p-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              Quality Poultry Products
            </h2>

            <p className="text-base md:text-lg">
              Support local farmers with our range of fresh dairy, eggs, and
              other essential farm goods.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>

        <a href="#item2" className="btn btn-xs">
          2
        </a>

        <a href="#item3" className="btn btn-xs">
          3
        </a>

        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
      <h2></h2>
      <div className="text-center py-10  border-blue-200">
        <h1 className="text-4xl font-bold text-gray-800">Latest Crops</h1>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
        {crops.map((crop) => (
          <div className="card bg-base-100 w-72 pt-5 shadow-sm mx-auto">
            <figure>
              <img src={crop.image} alt="Apps" />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{crop.name}</h2>
              <div className="card-actions justify-between">
                <button className="btn btn-active">
                  <Link key={crop._id} to={`/crops/${crop._id}`}>
                    View Details
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-10  border-blue-200">
        <button className="btn btn-active">
          <Link to={`/crops/`}>View All Crops</Link>
        </button>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-green-700">🌱 How It Works</h1>

          <p className="text-lg text-gray-600 mt-2">
            Connecting farmers directly to you in 3 simple steps.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg border-t-4 border-yellow-500">
            <div className="text-5xl mb-4 text-yellow-500">1️</div>

            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Discover Fresh Produce
            </h3>

            <p className="text-gray-600">
              Browse a wide selection of crops listed by local farmers, complete
              with pricing and available stock.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg border-t-4 border-blue-500">
            <div className="text-5xl mb-4 text-blue-500">2️⃣</div>

            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Express Interest
            </h3>

            <p className="text-gray-600">
              Send an interest request for the desired quantity. The farmer
              reviews and accepts the order directly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg border-t-4 border-red-500">
            <div className="text-5xl mb-4 text-red-500">3️</div>

            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Direct Transaction
            </h3>

            <p className="text-gray-600">
              Finalize payment and logistics directly with the farmer, ensuring
              fair prices and fresh delivery.
            </p>
          </div>
        </div>
      </div>
      {/* --- END: UPDATED SECTION 3 --- */}
      {/* --- START: UPDATED SECTION 4: AGRI BLOGS --- */}
      <div className="py-16">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-800">
            📰 Agri Blogs & Tips
          </h1>

          <p className="text-lg text-gray-600 mt-2">
            Stay informed with the latest farming trends and healthy eating
            advice.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div className="card w-full bg-base-100 shadow-xl image-full">
            <figure>
              <img src="/22.png" alt="Irrigation" className="opacity-70" />
            </figure>

            <div className="card-body justify-end">
              <h2 className="card-title text-white">
                Top 5 Water Saving Irrigation Techniques
              </h2>

              <p className="text-gray-200 text-sm">
                Learn how to make every drop count for better crop yield in dry
                seasons.
              </p>

              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Read Now</button>   
              </div>
            </div>
          </div>

          <div className="card w-full bg-base-100 shadow-xl image-full">
            <figure>
              <img src="/11.png" alt="Organic Food" className="opacity-70" />
            </figure>

            <div className="card-body justify-end">
              <h2 className="card-title text-white">
                Benefits of Eating Locally Sourced Organic Food
              </h2>

              <p className="text-gray-200 text-sm">
                From better nutrients to supporting your community, the
                advantages are many.
              </p>

              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Read Now</button>
              </div>
            </div>
          </div>

          <div className="card w-full bg-base-100 shadow-xl image-full">
            <figure>
              <img src="/33.png" alt="Pesticides" className="opacity-70" />
            </figure>

            <div className="card-body justify-end">
              <h2 className="card-title text-white">
                Natural Pest Control for Small Farms
              </h2>

              <p className="text-gray-200 text-sm">
                Keep your crops safe and your soil healthy using eco-friendly
                solutions.
              </p>

              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Read Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-200 py-16">
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-800">
            ⭐ What Our Customers Say
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div className="card w-full bg-white shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar mb-3">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="p1.png" alt="Farmer" />
                </div>
              </div>

              <blockquote className="italic text-gray-700">
                "KrishiLink has revolutionized my sales. I now get fair prices
                without relying on middlemen. Highly recommended for every small
                farmer!"
              </blockquote>

              <p className="font-bold mt-3">- Ahmed Hossain, Farmer</p>
            </div>
          </div>

          <div className="card w-full bg-white shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar mb-3">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/p2.png" alt="Restaurant Owner" />
                </div>
              </div>
              <blockquote className="italic text-gray-700">
                "The quality and freshness of the produce are unmatched. We
                source all our restaurant's vegetables here, and our customers
                notice the difference."
              </blockquote>
              <p className="font-bold mt-3">- Sofia Khan, Restaurant Owner</p> 
            </div>
          </div>

          <div className="card w-full bg-white shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar mb-3">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/p3.png" alt="Consumer" />
                </div>
              </div>

              <blockquote className="italic text-gray-700">
                "Shopping here is so easy. I love knowing exactly where my food
                comes from and that I'm supporting ethical, local agriculture."
              </blockquote>

              <p className="font-bold mt-3">- Rohan Das, Home Consumer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Join the Farm-to-Table Movement
          </h1>

          <p className="text-xl mb-8">
            Whether you're a farmer looking for fair prices or a buyer seeking
            the freshest local produce, KrishiLink is your direct connection.
          </p>

          <div className="space-x-4">
            <Link
              to={`/register`}
              className="btn btn-warning btn-lg text-black font-bold"
            >
              Register Now
            </Link>

            <Link
              to={`/crops`}
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-green-600"
            >
              Explore Crops
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
