import React from "react";

export default function Topbar() {
  return (
    <div className="bg-dark text-white small">
      <div className="container d-flex align-items-center justify-content-between py-2">
        <div className="d-flex gap-3">
          <span>
            <i className="bi bi-telephone me-2"></i>(414) 857 – 0107
          </span>
          <span className="d-none d-md-inline">
            <i className="bi bi-envelope me-2"></i>yummy@bistrobliss
          </span>
        </div>
        <div className="d-flex gap-3">
          <a className="text-white" href="#"><i className="bi bi-twitter-x"></i></a>
          <a className="text-white" href="#"><i className="bi bi-facebook"></i></a>
          <a className="text-white" href="#"><i className="bi bi-instagram"></i></a>
          <a className="text-white" href="#"><i className="bi bi-github"></i></a>
        </div>
      </div>
    </div>
  );
}
