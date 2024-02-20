
function CardOurServices({title , content}) {
  return (
    <div className="card py-3 position-relative col-12 col-md-5  cardServices ">
  <div className="card-body " style={{zIndex:3}}>
    <h3 className="card-title">{title}</h3>
    <p className="card-text fs-5">{content}</p>
    {/* <a href="#" className="card-link text-primary">Learn More</a> */}
    </div>
    {/* <h2 className="numberServices">{number<10 ? `0${number}`:number}</h2> */}
</div>  )
}

export default CardOurServices