import React, { Component } from 'react';

class Reviews extends Component {
    render() {
        return (
            <section id="reviews" className="section scrollspy">
                <div className="row">
                    <div className="col s12">
                        <h3>Reviews</h3>
                    </div>
                </div>
                <div className="row" id="card">

                    <div className="col s11 m4">
                        <div className="card teal">
                            <div className="reviewText">
                                <br />
                                <p>
                                    "I have been in the business a long time and it is refreshing to see such an innovative
                                and useful product.
                                The user experience is well designed and the function is flawless."
                                <br />
                                    <br />
                                </p>
                            </div>
                            <div className="reviewer">
                                <img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,w_92/v1492761116/cardImg_ct9vqo.png" />
                                <p className="white-text">
                                    Jeff Nichols CCO of Cool Company
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col s11 m4">
                        <div className="card teal">
                            <div className="reviewText">
                                <br />
                                <p>
                                    "I never want to go to the store so I am constantly
                                facing the issue of what can I make with what I have and this app
                                has kept me from starvation on several occasions. Love it!
                                <br />
                                    <br />
                                </p>
                            </div>
                            <div className="reviewer">
                                <img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,w_92/v1492764043/reviewer2_mzys5e.png" />
                                <p className="white-text">
                                    Jack Wilde Journalist at Tech Times
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="col s11 m4">
                        <div className="card teal">
                            <div className="reviewText">
                            <br/>
                            <p>
                                "I have worked as a head chef for twenty years. I tried out the application and
                                I have to say it has some amazing recipes. varIngredient definitely has good taste!"
                                <br/>
                                <br/>
                            </p>
                        </div>
                        <div className="reviewer">
                            <img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,w_92/v1492764048/reviewer3_j1jvye.png"/>
                            <p className="white-text">
                                June Smith Chef at Delicious Spot
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Reviews;