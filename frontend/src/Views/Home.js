import React, { Component } from 'react';
import '../css/Home.css'
import ReCAPTCHA from "react-google-recaptcha";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends Component{

    state={

        // save all projects as a variable in state so more can easily be added
        projects: [{
            img: require('../assets/images/kangaroo.jpg'),
            title: "Kangaroo - Task Management App",
            text: "Kangaroo is an objective tracking app focused on a simple UI to track tasks and deadline. It allows users to sign up and login in a secure manner to save their tasks and deadlines. It also supports the ability to add subtasks and display progress for each subtask, as well as manually mark tasks as complete, incomplete or on hold. This application was created using Angular, Golang, Postgresql, and Nginx",
            github: 'https://github.com/fahmed8383/Kangaroo-Task-Management-App',
            url: 'https://kangarooapp.devplayground.ca/',
        },
        {
            img: require('../assets/images/portfolio.jpeg'),
            title: "Portfolio Website",
            text: "This portfolio website is a simple application created using React.js, and Node.js. React was used to create the front-end, while node was used for processing of the contact forms and verifying captcha to prevent spam.",
            github: '',
            url: '',
        },
        {
            img: require('../assets/images/wildfire.jpeg'),
            title: "Wildfire Predictor",
            text: "Wilfire Predictor was a website made for makeuoft hackathon. The purpose of the website was to feed sensor data to through a machine learning algorithm to predict whether the data displayed the signs of a potential wildfire, these results were then displayed on the website in a map format. I worked in a team and used vuejs, golang, elasticsearch, and python to accomplish this.",
            github: 'https://github.com/fahmed8383/makeuoft_wildfirepredictor',
            url: '',
        },
        {
            img: require('../assets/images/acoustic.jpeg'),
            title: "Arduino Projects",
            text: "Worked on several Arduino focused projects such as an acoustic sensor able to break noises down using FFT to assist with detection of anomolies in servers, a self driving car able to make 180 or 360 turns when faced with an obstacle, and a simple weather station able to send readings to the user using tcp protocol.",
            github: '',
            url: '',
        },
    ],

        // save all components of the contact form in a single variable
        form: {
            email: '',
            subject: '',
            body: '',
            captcha: ''
        },

        // holds variables to check to see if the contact form is filled out correctly
        emailIncorrect: false,
        valuesMissing: false,
        emailSent: false,
        emailError: false,
    }

    // changes the email in the form variable located in state, also checks to make sure it is a valid email format
    changeEmail = (event) => {
        var form = {...this.state.form}
        form.email = event.target.value;
        this.setState({form: form});

        if(!this.validateEmail(event.target.value)){
            this.setState({emailIncorrect: true});
            return
        }

        this.setState({emailIncorrect: false});
    }

    // changes the subject in the form variable located in state
    changeSubject = (event) => {
        var form = {...this.state.form}
        form.subject = event.target.value;
        this.setState({form: form})
    }

    // changes the body in the form variable located in state
    changeBody = (event) => {
        var form = {...this.state.form}
        form.body = event.target.value;
        this.setState({form: form})
    }

    // changes the captcha value in the form variable located in state
    changeCaptcha = (event) => {
        var form = {...this.state.form}
        form.captcha = event;
        this.setState({form: form})
    }

    // verifies that all information is correct and submits the form
    submitForm = (event) => {

        //prevent page reload on submit
        event.preventDefault();

        // verify that all neccesary fields are completed
        if(this.state.form.email === '' || this.state.form.subject === '' || this.state.form.body === '' || this.state.form.captcha === ''){
            this.setState({valuesMissing: true});
            return
        }

        this.setState({valuesMissing: false});

        // verify that the entered is in a valid email format
        if(!this.validateEmail(this.state.form.email)){
            this.setState({emailIncorrect: true});
            return
        }

        this.setState({emailIncorrect: false});

        // send the form json variable to the backend for verification of the captcha and to send the email
        fetch("/api/send-email", {
            method: "post",
            body: JSON.stringify(this.state.form),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then((data)=>{
            // if succesful, set emailSent variable to true so a message can be displayed to the user
            // also reset the form
            if(data.msg === "success"){
                this.setState({emailSent: true});
                this.setState({form: {
                    email: '',
                    subject: '',
                    body: '',
                    captcha: ''
                }})
            }
            else if(data.msg === "failure"){
                this.setState({emailError: true});
            }
        }) 
        .catch(err => {
            console.log(err);
        });
    }

    // checks if the entered email is a valid email format
    validateEmail(email){
        var emailFormat = /\S+@\S+\.\S+/;
        return emailFormat.test(email);
    }

    render(){
        return (
            <div>
                <section className="headerSkew" id="title">
                    <div className="content">
                        <div className="headerTitle">
                            <h1>Hi! <br/> I am Faiq Ahmed</h1>
                        </div>
                        <section className="aboutSkew">
                            <div className="aboutContent">
                                <h1>Aspiring full stack developer. Looking to direct my software engineering education at McMaster to help me further my understanding of back-end and front-end systems. </h1>
                                <a  className="moreInfoButton" href="https://ca.linkedin.com/in/faiq-ahmed-0b0345170" rel="noopener noreferrer" target="_blank">Learn More</a>
                            </div>
                        </section>
                    </div>
                </section>
                <section className="subSection" id="projects">
                    <h1>My Projects</h1>
                    <hr/>
                    <div className="projects">

                        {/*Dynamically load each project from the projects variables saved in state*/}
                        {this.state.projects.map((project) => 
                            <div key={project.title} className="card">
                                <img src={project.img} alt={project.title}></img>
                                <div className="cardLinks">

                                    {/*only display icons if the url is present for the project*/}
                                    {project.github !=='' &&(<FontAwesomeIcon icon={faGithub} style={{cursor: 'pointer', marginRight: '10px'}} onClick={()=> window.open(project.github, "_blank")}></FontAwesomeIcon>)}
                                    {project.url !=='' &&(<FontAwesomeIcon icon={faLink} style={{cursor: 'pointer', marginRight: '10px'}} onClick={()=> window.open(project.url, "_blank")}></FontAwesomeIcon>)}
                                </div>
                                <h3>{project.title}</h3>
                                <p>{project.text}</p>
                            </div>
                        )}

                    </div>
                </section>
                <section className="subSection" id="workExperience">
                    <h1>Work Experience</h1>
                    <hr/>
                    <div className="jobTitle">
                        <h2>Fullstack Developer</h2>
                        <p>FyeLabs/ McMaster University <br/>
                        June 2019 - May 2020
                        </p>
                        <hr/>
                    </div>
                    <div className="jobDescription">
                        <ul>
                            <li>Utilized Vue.js, Golang, ElasticSearch, Docker, and Caddy to develop a significant portion of the  <a href="https://gcdcs20.ca/" rel="noopener noreferrer" target="_blank">Great Canadian Data Center Symposium</a> event website (currently incomplete, as the event was postponed). The website allows users to sign up for the event, register for specific presentations, as well as book meetings with each other. The website also acts as a simplified cms which allows event hosts to modify several components of the website.</li><br/>
                            <li>Utilized Wordpress and PHP to develop and modify several plug-ins to create the  <a href="https://masksandmore.ca/" rel="noopener noreferrer" target="_blank">Masks and More</a> website which allows vendors to register and sell personal protective equipment once their product has been verified through an internal system in the website.</li><br/>
                            <li>Utilized Wordpress design the  <a href="https://circ.mcmaster.ca/" rel="noopener noreferrer" target="_blank">FyeLabs</a> website, and developed the application forms using custom PHP.</li><br/>
                        </ul>
                    </div>
                </section>
                <section className="footerSkew" id="contactForm">
                    <section className="triangle"/>
                    <div className="contactForm">
                        <div className="formHeader">
                            <h2>Contact Me</h2>
                        </div>
                        <form onSubmit={this.submitForm}>
                            <div className="formBody">
                                <label>Email</label><br/>
                                <input type="text" value={this.state.form.email} onChange={this.changeEmail}></input>
                                {this.state.emailIncorrect && this.state.form.email !== '' && (<p className="dangerText">Please enter a valid email address</p>)}
                                {this.state.valuesMissing && this.state.form.email === '' && (<p className="dangerText">This field is required</p>)}
                                <label>Subject</label><br/>
                                <input type="text" value={this.state.form.subject} onChange={this.changeSubject}></input>
                                {this.state.valuesMissing && this.state.form.subject === '' && (<p className="dangerText">This field is required</p>)}
                                <label>Body</label><br/>
                                <textarea value={this.state.form.body} onChange={this.changeBody} />
                                {this.state.valuesMissing && this.state.form.body === '' && (<p className="dangerText">This field is required</p>)}<br/><br/>
                                <ReCAPTCHA theme="dark" sitekey="6LebOcoZAAAAAGGYkJ3ZiuX1h2JvcaMmh8IYbD0J" onChange={this.changeCaptcha}/>
                                {this.state.valuesMissing && this.state.form.captcha === '' && (<p className="dangerText">This field is required</p>)}
                                {this.state.emailError && (<p className="dangerText">An error occured while sending your email. Please try again later.</p>)}
                                {this.state.emailSent && (<p className="dangerText" style={{color: 'green'}}>Your email has been received. Thank you for contacting us</p>)}
                            </div>
                            <div className="formFooter">
                                <input type="submit" className="button1" value="Submit"></input>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home