import React from "react";
import { Link, useLoaderData } from "react-router";

const Home = () => {
  const crop = useLoaderData();
  const crops = crop.slice(-6);

  console.log(crops);
  return (
    <div>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img src="/1.jpg" className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src="/2.jpg" className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src="/3.jpg" className="w-full" />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img src="/4.jpg" className="w-full" />
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
      <h2>latest 6 crops</h2>

      <div className="grid grid-cols-3 gap-4">
        {crops.map((crop) => (
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10">
              <img src={crop.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{crop.name}</h2>
              <p>{crop.description}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-active">
        <Link to={`/crops/`}>View All Crops</Link>
      </button>
      <div>
        <h2>How it works</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          facere illo dolorem, nisi porro consequatur eum incidunt? Quisquam
          quos distinctio fuga exercitationem porro possimus nesciunt itaque
          beatae sed. Illo dolorem ipsam enim! Quisquam nobis fuga facilis ipsam
          labore recusandae incidunt dolorum culpa perspiciatis, ducimus maxime
          cumque facere doloremque id ratione? Voluptatem ad numquam,
          voluptatibus aliquid eum fuga nulla porro.
        </p>
      </div>

      <div>
        <h2>Agri blogs</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
          laboriosam numquam corporis quis saepe! Aut accusamus in blanditiis
          dolor eos ullam recusandae adipisci et vitae corporis repudiandae
          debitis numquam sit est saepe aperiam nesciunt asperiores nemo
          doloremque, error soluta iusto quae ipsa. Nesciunt sapiente eligendi
          nihil. Itaque facere possimus commodi iure cum obcaecati, dolore enim
          aperiam, expedita laboriosam eligendi, delectus deserunt? Nostrum
          repellendus repellat consectetur, nesciunt ratione maxime rerum porro,
          doloremque recusandae explicabo animi sunt dolor iste magnam a esse,
          eaque perferendis culpa voluptatum deserunt expedita quo? Voluptate
          molestiae a impedit hic, atque illo voluptates aliquid ut sed tempora.
        </p>
      </div>

      <div>sectiom 5</div>

      <div>sectiom 6</div>
    </div>
  );
};

export default Home;
