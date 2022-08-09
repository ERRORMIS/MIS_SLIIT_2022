import React, { Component } from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { bootstrap } from "bootstrap";
import "./ImageContainer.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class ImageContainer extends Component {
  render() {
    return (
      <Wrapper>
        <div
          id="carouselExampleIndicators"
          class="carousel slide w-75"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                class="mw-100"
                src="https://static.sliit.lk/wp-content/uploads/2020/01/06040608/SLIIT-BSc-Hons-in-Information-Technology-Specializing-in-Data-Science.jpg"
                alt=""
                title=""
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://static.sliit.lk/wp-content/uploads/2020/01/06040648/SLIIT-BSc-Hons-in-Information-Technology-Specializing-in-Information-Systems-Engineering.jpg"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://static.sliit.lk/wp-content/uploads/2020/01/06040550/SLIIT-BSc-Hons-in-Information-Technology-Specializing-in-Cyber-Security.jpg"
                class="d-block w-100"
                alt="..."
              />
            </div>
          </div>

          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
              <div class="card h-100">
                <img
                  src="https://static.sliit.lk/wp-content/uploads/2021/09/08150615/Biological-Science-1.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">Humanities &amp; Sciences</h5>
                  <p class="card-text">
                    The Faculty of Humanities and Sciences strives to develop
                    professionals in the areas of Education, Science,
                    Mathematics and Nursing.
                  </p>
                  <a
                    href="/"
                    class="btn btn-fullcolor ca-more js-ca-more"
                    tabindex="0"
                  >
                    MORE{" "}
                    <span class="glyphicon glyphicon-chevron-right kl-icon-white"></span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img
                  src="https://static.sliit.lk/wp-content/uploads/2019/12/10043705/BSc-Hons-in-Information-Technology-Specializing-in-Information-Technology-SLIIT-cover.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h3 class="card-title">Computing &amp;</h3>
                  <p class="card-text">
                    Offering world class higher education in computing
                    technology and producing skilled and able graduates to
                    fulfill the dynamic needs of the fast changing world.
                  </p>
                  <a
                    href="/"
                    class="btn btn-fullcolor ca-more js-ca-more"
                    tabindex="0"
                  >
                    MORE{" "}
                    <span class="glyphicon glyphicon-chevron-right kl-icon-white"></span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img
                  src="https://www.sliit.lk/wp-content/uploads/2017/11/civil-engineering-2.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h3 class="card-title">Engineering</h3>
                  <p class="card-text">
                    The educate center of the engineers and scientists in charge
                    of tomorrow’s technology for sustainability and innovation
                  </p>
                  <a
                    href="/"
                    class="btn btn-fullcolor ca-more js-ca-more"
                    tabindex="0"
                  >
                    MORE{" "}
                    <span class="glyphicon glyphicon-chevron-right kl-icon-white"></span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img
                  src="https://www.sliit.lk/wp-content/uploads/2017/10/sliit-research-business-faculty.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h3 class="card-title">Business</h3>
                  <p class="card-text">
                    The place where future business leaders, strategic managers,
                    innovative entrepreneurs are forged via up-to-date knowledge
                    and interdisciplinary thinking.
                  </p>
                  <a
                    href="/"
                    class="btn btn-fullcolor ca-more js-ca-more"
                    tabindex="0"
                  >
                    MORE{" "}
                    <span class="glyphicon glyphicon-chevron-right kl-icon-white"></span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img
                  src="https://static.sliit.lk/wp-content/uploads/2020/09/16074429/BSc-Hons-in-Architecture-img.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h3 class="card-title">Architecture</h3>
                  <p class="card-text">
                    This professional pathway is ideal for creative people with
                    sensitivity, imagination and ability to appreciate the
                    technical aspects of building Construction.
                  </p>
                  <a
                    href="/"
                    class="btn btn-fullcolor ca-more js-ca-more"
                    tabindex="0"
                  >
                    MORE{" "}
                    <span class="glyphicon glyphicon-chevron-right kl-icon-white"></span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img
                  src="https://www.cahm.lk/wp-content/uploads/2021/01/SFP_2115-scaled.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h3 class="ca-title" itemprop="headline">
                    Hospitality &amp; Culinary
                  </h3>
                  <p class="card-text">
                    The William Angliss Institute @ SLIIT, is a joint venture
                    between William Angliss Institute, Melbourne and is based in
                    the SLIIT campus, Malabe.
                  </p>
                  <a
                    href="/"
                    class="btn btn-fullcolor ca-more js-ca-more"
                    tabindex="0"
                  >
                    MORE{" "}
                    <span class="glyphicon glyphicon-chevron-right kl-icon-white"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
