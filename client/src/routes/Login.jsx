import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    };

    onSubmit = async () => {
        const { email, password } = this.state

        const response = await this.props.mutate({
            variables: { email, password }
        })

        const { ok, token, refreshToken } = response.data.login

        if (ok) {
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)
        }
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

const loginMutation = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ok
            token
            refreshToken
            errors {
                path
                message
            }
        }
    }
`

export default graphql(loginMutation)(Login)