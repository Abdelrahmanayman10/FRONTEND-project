import React from "react";

export default function Blog() {
  const posts = [
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
    {
      id: 5,
      title: "5 great cooking gadgets you can buy to save time",
      image: "/src/assets/blog5.jpg",
      date: "Aug 1, 2025",
      link: "/blog/5",
    },
    {
      id: 6,
      title: "The secrets tips & tricks to prepare a perfect burger",
      image: "/src/assets/blog6.jpg",
      date: "Jul 29, 2025",
      link: "/blog/6",
    },
    {
      id: 7,
      title: "7 delicious cheesecake recipes you can prepare",
      image: "/src/assets/blog7.jpg",
      date: "Jul 25, 2025",
      link: "/blog/7",
    },
    {
      id: 8,
      title: "5 great pizza restaurants you should visit this city ",
      image: "/src/assets/blog8.jpg",
      date: "Jul 20, 2025",
      link: "/blog/8",
    },
    {
      id: 9,
      title: "5 great cooking gadgets you can buy to save time",
      image: "/src/assets/blog9.jpg",
      date: "Jul 15, 2025", 
      link: "/blog/9",
    },
    {
      id: 10,
      title: "How to prepare a delicious gluten free sushi",
      image: "/src/assets/blog10.jpg",
      date: "Jul 12, 2025",
      link: "/blog/10",
    },
    {
      id: 11,
      title: "Top 20 simple and quick desserts for kids ",
      image: "/src/assets/blog11.jpg",
      date: "Jul 8, 2025",
      link: "/blog/11",
    },
    {
      id: 12,
      title: "Top 20 simple and quick desserts for kids ",
      image: "/src/assets//blog12.jpg",
      date: "Jul 5, 2025",
      link: "/blog/12",
    },
  ];

  return (
    <section className="container py-5">
      
      <div className="text-center mb-5">
        <h2 className="fw-bold">Read Our Blog</h2>
        <p className="text-center mb-4">
          Latest updates, recipes and stories from our chefs.
        </p>
      </div>

    
      <div className="row">
        {posts.map((post) => (
          <div className="col-lg-3 col-md-6 mb-4" key={post.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={post.image}
                className="card-img-top rounded-top"
                alt={post.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <small className="text-muted mb-2">
                  {post.date} • {post.author}
                </small>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-muted">{post.desc}</p>
                <a
                  href="/ReadMoreArticles"  to="/ReadMoreArticles"
                  className="btn btn-outline-dark rounded-pill mt-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



