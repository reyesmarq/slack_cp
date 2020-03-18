import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    };

    onSubmit = () => {
        const { email, password } = this.state

        console.log(email)
        console.log(password)
    }

    onChange = e => {
        const { name, value } = e.target;
        // name = "email";
        this.setState({ [name]: value });
    };

    render() {
        const { email, password } = this.state;

        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Input
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    placeholder="Email"
                    fluid
                />
                <Input
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    type="password"
                    placeholder="Password"
                    fluid
                />
                <Button onClick={this.onSubmit}>Submit</Button>
            </Container>
        );
    }
}

export default Login
