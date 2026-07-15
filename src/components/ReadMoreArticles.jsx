import React from "react";

export default function ReadMoreArticles() {
  const articles = [
    {
      id: 1,
      title: "How to prepare a delicious gluten free sushi",      
      image: "./src/assets/blog1.jpg",
      date: "Jan 3, 2025",     
      link: "/blog/1",
    },
    {
      id: 2,
      title: "Exclusive baking lessons from the pastry king",     
      image: "/src/assets/blog2.jpg",
      date: "Aug 10, 2025",     
      link: "/blog/2",
    },
    {
      id: 3,
      title: "How to prepare the perfect fries in an air fryer",     
      image: "/src/assets/blog3.jpg",
      date: "Aug 8, 2025",
      link: "/blog/3",
    },
    {
      id: 4,
      title: "How to prepare delicious chicken tenders ",
      image: "/src/assets/blog4.jpg",
      date: "Aug 5, 2025",
      link: "/blog/4",
    },
  ];

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">Read More Articles</h2>
      <div className="row">
        {articles.map((article) => (
          <div className="col-lg-3 col-md-6 mb-4" key={article.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={article.image}
                className="card-img-top"
                alt={article.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.desc}</p>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
