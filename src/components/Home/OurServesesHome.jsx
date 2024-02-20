import { Link } from "react-router-dom"
import CardOurServices from "./CardOurServices"
import { useTranslation } from "react-i18next"


function OurServesesHome() {
  const [t, i18n] = useTranslation()
  const cards = [
    {
      title: t("service.card1Title"),
      content: t("service.card1Content")
    },
    {
      title: t("service.card2Title"),
      content: t("service.card2Content")
    },
    {
      title: t("service.card3Title"),
      content: t("service.card3Content")
    },
    {
      title: t("service.card4Title"),
      content: t("service.card4Content")
    },
    {
      title: t("service.card5Title"),
      content: t("service.card5Content")
    },
  ]
  return (
    <div style={{ backgroundColor: "rgba(0, 98, 255, 0.19)" }}>
      <div className="container py-5">
        <h2 className="text-center  fs-1">{t('services')}</h2>
        <div className="d-flex justify-content-evenly flex-wrap gap-3">
          {cards.map(ele =>
            <CardOurServices title={ele.title} content={ele.content} />
          )}

        </div>
        <div className="text-center mt-4">
          <Link to={'/'} className=" btn btn-primary text-center  fs-3 ">{t('contactUS')}</Link>
        </div>
      </div>
    </div>
  )
}

export default OurServesesHome