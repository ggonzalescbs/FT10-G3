import React from 'react';
import styled from 'styled-components';
import homeIcon from '../../../../../../icons/home.svg';
const HomeButton = () => {
    return (
        <StyledHomeButton>
            <img src={homeIcon} alt=""/>
            <span>Home</span>
        </StyledHomeButton>
    )
}

const StyledHomeButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    background:none;
    padding: 1rem 1rem;
    border: 1px solid #d4d4d4;
    border-radius: 13px;
    width:9rem;
    img{
        width:1rem;
        height:1rem;
        margin-right:0.3rem;
        //background:yellow;
    }
    span{
        //background:red;
        //width:1.1rem;
        height:1.1rem;
        display:flex;
        align-items:center;
        
    }
`;

export default HomeButton
