
const SalesCars = props => {

    return (
        <>
            <section className="choose-car-section pt-120 pb-120 section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-header text-center">
                                <h2 className="section-title">Cars for Sale</h2>
                                <p> Look through our equisite selection of cars and get one that fits your choice</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {props.cars.map(car => ( car.isBought === false) && <div className="car-item col-lg-4 col-md-6 col-sm-12">
                            <div className="thumb">
                                <img src={car.carImage} alt="item" />
                            </div>
                            <div className="car-item-body">
                                <div className="content">
                                    <h4 className="title">{car.carName}</h4>
                                    <span className="price">Price:${car.price / 10 ** 17}</span>
                                    <p>{props.car.carDescription}</p>
                                    <a onClick={() => props.buyCar(car.price / 10 ** 17, car.index)} className="cmn-btn">Buy Car</a>
                                </div>
                                <div className="car-item-meta">
                                    <ul className="details-list">
                                        <li><i className="fa fa-sliders" />{(car.isUsed === 'true' || car.isUsed === true) ? 'Used' : 'New'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-header text-center">
                                <h2 className="section-title">our awesome features</h2>
                                <p>These is what makes us at CeloDealer special</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-none-30">
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-item text-center">
                                <div className="icon"><i className="fa fa-user" /></div>
                                <div className="content">
                                    <h4 className="title">New/Used Cars</h4>
                                    <p>We offer you the choice to choose between used and new cars</p>
                                </div>

                            </div>
                        </div>{/* icon-item end */}
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-item text-center">
                                <div className="icon"><i className="fa fa-rocket" /></div>
                                <div className="content">
                                    <h4 className="title">fast services</h4>
                                    <p>All our services are time and speed efficent </p>
                                </div>
                            </div>
                        </div>{/* icon-item end */}
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-item text-center">
                                <div className="icon"><i className="fa fa-volume-control-phone" /></div>
                                <div className="content">
                                    <h4 className="title">customer support</h4>
                                    <p>We offer 24/7 customer support </p>

                                </div>
                            </div>
                        </div>{/* icon-item end */}
                    </div>
                </div>
            </section>

        </>


    );
}

export default SalesCars;