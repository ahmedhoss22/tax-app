import { useState } from "react";
import EBlog from "../components/EBlog";
import { useTranslation } from "react-i18next";
import Api from "../Api";
import { toast } from "react-toastify";

const Contact = () => {
  const [t, i18n] = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/contact/send", formData);
      toast.success(res.data.message);
      setFormData({
        name: "",
        title: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const checkError = error.response.status;
      const dataError = error.response.data.error;
      if (checkError === 400) {
        dataError?.forEach((err) => toast.error(err.message));
      } else {
        toast.error(`An error occurred. Please try again later ${dataError}`);
      }
    }
  };

  return (
    <div>
      <section className="col-lg-8 col-sm-12 mx-auto mb-5 mt-5">
        <h1 className="text-center" style={{ color: "#585858" }}>
          {t("contactUS")}
        </h1>
        <p className="text-center" style={{ color: "#292929" }}>
          {t("infoContactUs")}
        </p>
        <form
          className="col-9 rounded-4 border m-auto mt-5 p-3 row"
          onSubmit={handleSubmit}
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
        >
          <div className="col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="Name" className="fw-bold">
              {t("name")} <span style={{ color: "#FA0000" }}>*</span>
            </label>
            <input
              className="rounded border form-control mt-2 py-2 "
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <label htmlFor="Title" className="fw-bold">
              {t("Title")}
            </label>
            <input
              className="rounded border form-control mt-2 py-2"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 my-2">
            <label htmlFor="email" className="fw-bold">
              {t("email")} <span style={{ color: "#FA0000" }}>*</span>
            </label>
            <input
              type="email"
              className="rounded border form-control mt-2 py-2"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 my-2">
            <label htmlFor="Name" className="fw-bold">
              {t("subject")}
            </label>
            <input
              className="rounded border form-control mt-2 py-2"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 my-2">
            <label htmlFor="Message" className="fw-bold">
              {t("message")}
            </label>
            <textarea
              className="form-control rounded border mt-2"
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="py-2 col-xl-4 col-sm-6 col-9 border-0 text-white fw-bold rounded-5 center"
              style={{ backgroundColor: "#0062FF" }}
            >
              {t("send")}
            </button>
          </div>
        </form>
      </section>
      <div className="col-12 rounded mx-auto col-md-11">
        <div className="row justify-content-between">
          <iframe className="col m-1" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3455.555816220557!2d31.227053075551854!3d29.99219287494996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU5JzMxLjkiTiAzMcKwMTMnNDYuNyJF!5e0!3m2!1sen!2seg!4v1708893147025!5m2!1sen!2seg" width="600" height="450" style={{ border: "0" ,borderRadius:"6px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <iframe className="col m-1" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3455.555816220557!2d31.227053075551854!3d29.99219287494996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU5JzMxLjkiTiAzMcKwMTMnNDYuNyJF!5e0!3m2!1sen!2seg!4v1708893147025!5m2!1sen!2seg" width="600" height="450" style={{ border: "0" ,borderRadius:"6px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <section className="col-10 mx-auto mb-5  ">
        <div className="row d-flex justify-content-around cardMap">
          <div className="col-lg-3 bg-light  col-md-5 col-10 p-3 rounded-4 border border-primary text-center mt-3">
            <i
              className="fs-1 fas fa-phone my-4"
              style={{ color: "#0062FF" }}
            />
            <h4 className="my-3">{t("phone")}</h4>
            <h6 className="mt-2">020225254487</h6>
          </div>
          <div className="col-lg-3 bg-light  col-md-5 col-10 p-3 rounded-4 border border-primary text-center mt-3">
            <i
              className="fs-1 fas fa-envelope my-4"
              style={{ color: "#0062FF" }}
            />
            <h4 className="my-3">{t("email")}</h4>
            <h6 className="mt-3">info@kbs.com.eg</h6>
          </div>
          <div className="col-lg-3 bg-light  col-md-5 col-10 p-3 rounded-4 border border-primary text-center mt-3">
            <i
              className="fs-1 fas fa-tenge my-4"
              style={{ color: "#0062FF" }}
            />
            <h4 className="my-3">offices</h4>
            <h6 className="my-3"> - {t("address")} </h6>
            <h6 className="my-3">- {t("address2")}</h6>
          </div>
        </div>
      </section>

    <h2 className="text-center mb-4 font-blold">Oman branch </h2>
      <div className="col-12 rounded mx-auto col-md-11">
        <div className="row justify-content-between">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14624.80173626746!2d58.36568355!3d23.597143600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8e00101fe9fd31%3A0x3436eb891218a6ff!2z2KfZhNi52LDZitio2Kkg2KfZhNi02YXYp9mE2YrYqdiMINmF2LPZgti32Iwg2LnZhdin2YY!5e0!3m2!1sar!2seg!4v1708894525834!5m2!1sar!2seg" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>       </div>
      </div>
      <section className="col-10 mx-auto mb-5  ">
        <div className="row d-flex justify-content-around cardMap">
          <div className="col-lg-3 bg-light  col-md-5 col-10 p-3 rounded-4 border border-primary text-center mt-3">
            <i
              className="fs-1 fas fa-phone my-4"
              style={{ color: "#0062FF" }}
            />
            <h4 className="my-3">{t("phone")}</h4>
            <h6 className="mt-2">020225254487</h6>
          </div>
          <div className="col-lg-3 bg-light  col-md-5 col-10 p-3 rounded-4 border border-primary text-center mt-3">
            <i
              className="fs-1 fas fa-envelope my-4"
              style={{ color: "#0062FF" }}
            />
            <h4 className="my-3">{t("email")}</h4>
            <h6 className="mt-3">info@kbs.com.eg</h6>
          </div>
          <div className="col-lg-3 bg-light  col-md-5 col-10 p-3 rounded-4 border border-primary text-center mt-3">
            <i
              className="fs-1 fas fa-tenge my-4"
              style={{ color: "#0062FF" }}
            />
            <h4 className="my-3">{t("Office")}</h4>
            <h6 className="my-3">{t("address3")}</h6>
          </div>
        </div>
      </section>
      {/* <EBlog /> */}
    </div>
  );
};

export default Contact;
