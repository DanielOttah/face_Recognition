import React from 'react';
//👽 
class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            showError: "none"
        }
    }

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSignInClick = async () => {
        const resp = await fetch('https://radiant-caverns-61113.herokuapp.com/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        if (resp.status === 200) {
            this.props.loadUser(await resp.json())
            this.props.onRouteChange('home');
        } else {
            this.setState({
                showError: "block"
            })
        }
    }

    render() {
        return (

            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <span className="errorMessage" style={{ display: this.state.showError }}>Invalid credentials entered</span>

                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onEmailChange} value={this.state.email} type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onPasswordChange} value={this.state.password} type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSignInClick} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>

        );
    }
}


export default SignIn;