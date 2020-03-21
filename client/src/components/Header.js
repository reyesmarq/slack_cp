import React from 'react'
import styled from 'styled-components';
import { Header as HeaderUI } from 'semantic-ui-react'

const HeaderWrapper = styled.div`
grid-column: 3;
grid-row: 1;
`;

const Header = ({ channelName }) => (
    <HeaderWrapper>
        <HeaderUI textAlign="center">#{channelName}</HeaderUI>
    </HeaderWrapper>
)

export default Header