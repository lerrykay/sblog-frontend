import React from "react";

const News = () => {
  const newsItems = [
    {
      title: "Champions League Thrillers!",
      desc: "Relive last night's incredible comeback as underdogs stunned the champions with two late goals.",
      img: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1500&q=80",
    },
    {
      title: "Transfer Talks Heating Up",
      desc: "Rumors are flying as top clubs eye major moves before the January window opens.",
      img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Match Highlights: Weekend Recap",
      desc: "Catch up on the best goals, saves, and drama from this weekend’s top football leagues.",
      img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <section className="news-section py-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-5 text-light">Latest Football Stories</h2>
        <div className="row g-4">
          {newsItems.map((news, index) => (
            <div className="col-md-4" key={index}>
              <div className="card news-card h-100 shadow-lg border-0">
                <img src={news.img} className="card-img-top" alt={news.title} />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{news.title}</h5>
                  <p className="card-text">{news.desc}</p>
                  <button className="btn btn-primary">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
