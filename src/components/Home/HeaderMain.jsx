import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function HeaderMian() {
  const [t , i18n] = useTranslation()
  console.log(i18n.language);
  return (
    <main>
      <div className="main">
        <div className="overlay">
          <div className="container" dir={i18n.language == "ar" ? "rtl" :"ltr"}>
            <h1 className=" d-block fs-1">
              {t("home.title")}
              <span className="text-primary " dir={i18n.dir}> {t("home.title2")}</span>{" "}
            </h1>
            <p className="h3 mt-4">
              {t("home.content")}
            </p>
            <div className="mt-4 d-flex  flex-wrap">
              <Link to={'/user/newRequestService'}
                className="btn btn-primary rounded-5 me-2 col-lg-2 col-md-3 col-sm-12 mt-3 "
              >
                {t("home.request")}
              </Link>
              <button
                className="btn btn-outline-primary rounded-5 col-lg-2 col-md-2 col-sm-12 mt-3"
                type="button"
              >
                {t("home.learnMore")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HeaderMian;
