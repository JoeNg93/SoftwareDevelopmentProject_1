import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <section id="contact" className="section scrollspy hide-on-small-only">
        <div className="row">
          <div className="col s12">
            <h3>Contact Us</h3>
          </div>
        </div>

        <form id="contactUs">

          <div className="row">
            <div className="col s12">
              <div className="col s12 m4" id="contactUsHeader">
                <h5>
                  For general questions feel free to send us a message!
                            </h5>
                <hr id="contactHr" />
              </div>

              <div className="col s12 m4 offset-m4" id="recipeRequest">
                <h5>Have a good recipe? Click the button and fill out the form to get it added!</h5>
                <a className="waves-effect waves-light btn" href="#recipeModal">Add Recipe</a>

                <div id="recipeModal" className="modal">
                  <div className="modal-content">
                    <h4>Recipe Request</h4>

                    <div className="row">
                      <div className="col s12">
                        <div className="input-field">
                          <input id="contactEmail2" type="email" className="validate" />
                          <label htmlFor="contactEmail2" data-error="Please try again."
                            data-success="">Email</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12">
                        <div className="input-field">
                          <textarea id="recipeName" className="materialize-textarea"
                            required="required"></textarea>
                          <label htmlFor="recipeName">Recipe Name</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12">
                        <div className="input-field">
                          <input type="text" name="tags" id="ingredientTags" value=""
                            data-role="materialtags" required />
                          <label htmlFor="ingredientTags">Ingredients: Please add name and
                                                    amount.</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12">
                        <div className="input-field" id="recipeCookTime">
                          <select required>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="5">5 mins</option>
                            <option value="10">10 mins</option>
                            <option value="15">15 mins</option>
                            <option value="20">20 mins</option>
                            <option value="25">25 mins</option>
                            <option value="30">30 mins</option>
                            <option value="35">35 mins</option>
                            <option value="40">40 mins</option>
                            <option value="45">45 mins</option>
                            <option value="50">50 mins</option>
                            <option value="55">55 mins</option>
                            <option value="60">60 mins</option>
                            <option value="65">1 hour 5 mins</option>
                            <option value="70">1 hour 10 mins</option>
                            <option value="75">1 hour 15 mins</option>
                            <option value="80">1 hour 20 mins</option>
                            <option value="85">1 hour 25 mins</option>
                            <option value="90">1 hour 30 mins</option>
                            <option value="95">1 hour 35 mins</option>
                            <option value="100">1 hour 40 mins</option>
                            <option value="105">1 hour 45 mins</option>
                            <option value="110">1 hour 50 mins</option>
                            <option value="115">1 hour 55 mins</option>
                            <option value="120">2 hours</option>
                            <option value="125">2 hour 5 mins</option>
                            <option value="130">2 hour 10 mins</option>
                            <option value="135">2 hour 15 mins</option>
                            <option value="140">2 hour 20 mins</option>
                            <option value="145">2 hour 25 mins</option>
                            <option value="150">2 hour 30 mins</option>
                            <option value="155">2 hour 35 mins</option>
                            <option value="160">2 hour 40 mins</option>
                            <option value="165">2 hour 45 mins</option>
                            <option value="170">2 hour 50 mins</option>
                            <option value="175">2 hour 55 mins</option>
                            <option value="180">3 hours</option>
                            <option value="185">3 hour 5 mins</option>
                            <option value="190">3 hour 10 mins</option>
                            <option value="195">3 hour 15 mins</option>
                            <option value="200">3 hour 20 mins</option>
                            <option value="205">3 hour 25 mins</option>
                            <option value="210">3 hour 30 mins</option>
                            <option value="215">3 hour 35 mins</option>
                            <option value="220">3 hour 40 mins</option>
                            <option value="225">3 hour 45 mins</option>
                            <option value="230">3 hour 50 mins</option>
                            <option value="235">3 hour 55 mins</option>
                            <option value="240">4 hours</option>
                            <option value="245">4 hour 5 mins</option>
                            <option value="250">4 hour 10 mins</option>
                            <option value="255">4 hour 15 mins</option>
                            <option value="260">4 hour 20 mins</option>
                            <option value="265">4 hour 25 mins</option>
                            <option value="270">4 hour 30 mins</option>
                            <option value="275">4 hour 35 mins</option>
                            <option value="280">4 hour 40 mins</option>
                            <option value="285">4 hour 45 mins</option>
                            <option value="290">4 hour 50 mins</option>
                            <option value="295">4 hour 55 mins</option>
                            <option value="300">5 hours</option>
                          </select>
                          <label>Cook Time</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12">
                        <div className="input-field" id="recipeServings">
                          <select required>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                          <label>Number of Servings</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12">
                        <div className="input-field">
                          <textarea id="recipeInstructions" className="materialize-textarea"
                            required="required"></textarea>
                          <label htmlFor="recipeInstructions">Recipe Instructions</label>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer" id="recipeModalFooter">
                    <a href="#!" id="submitRecipe"
                      className="modal-action modal-close waves-effect waves-default btn-flat">Submit</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="contactInputs">

            <div className="row">
              <div className="input-field col s12 m4">
                <input id="contactEmail" type="email" className="validate" />
                <label htmlFor="contactEmail" data-error="Please try again." data-success="">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m4">
                <textarea id="messageText" className="materialize-textarea" required="required"></textarea>
                <label htmlFor="messageText">Message</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m4">
                <button id="sendMessage" className="btn waves-effect waves-light valign-wrapper" type="submit"
                  name="action">Send
                                Message
                            </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default Contact;