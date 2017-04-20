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

                <div className="col s4">
                    <div className="card-panel teal">
                     <span className="white-text">I am a very simple card. I am good at containing small bits of information.
                          I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
                     </span>
                    </div>
                </div>

                <div className="col s4">
                    <div className="card-panel teal">
                  <span className="white-text">I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
                  </span>
                    </div>
                </div>

                <div className="col s4">
                    <div className="card-panel teal">
                      <span className="white-text">I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
                      </span>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}

export default Reviews;