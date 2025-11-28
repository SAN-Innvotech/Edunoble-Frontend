import React, { useState } from "react";

import { contactData } from "@/data/contactLinks";

// import MapComponent from "./Map";

export default function ContactOne() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    source: "website",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call here with formData payload
    console.log("Form Data:", formData);
  };

  return (
    <>
      {/* <section className="">
        <MapComponent />
      </section> */}
      <section className="layout-pt-md layout-pb-lg mt-100" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row y-gap-50 justify-between">
            <div className="col-lg-4">
              <h3 className="text-24 fw-500">Get In Touch With Us</h3>
              <p className="mt-25">
                Have questions about our sample papers for Class 10, 11, or 12? 
                We're here to help! Reach out to us for any queries, feedback, or support.
              </p>

              <div className="y-gap-30 pt-60 lg:pt-40">
                {contactData.map((elm, i) => (
                  <div key={i} className="d-flex items-center">
                    <div className="d-flex justify-center items-center size-60 rounded-full bg-light-7">
                      <img src={elm.icon} alt="icon" />
                    </div>
                    <div className="ml-20">
                      {elm.address
                        ? `${elm.address
                            .split(" ")
                            .slice(0, 4)
                            .join(" ")} \n ${elm.address
                            .split(" ")
                            .slice(4, -1)
                            .join(" ")}`
                        : elm.email || elm.phoneNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-7">
              <h3 className="text-24 fw-500">Send Us a Message</h3>
              <p className="mt-25">
                Fill out the form below and we'll get back to you as soon as possible. 
                <br /> Whether you need help with sample papers or have suggestions, we'd love to hear from you!
              </p>

              <form
                className="contact-form row y-gap-30 pt-60 lg:pt-40"
                onSubmit={handleSubmit}
              >
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name..."
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email..."
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone..."
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject..."
                  />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message..."
                    rows="8"
                  ></textarea>
                </div>
                <input type="hidden" name="source" value={formData.source} />
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -purple-1 text-white"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
