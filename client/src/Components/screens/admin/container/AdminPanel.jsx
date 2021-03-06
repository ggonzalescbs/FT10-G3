import React, {useState} from 'react';
import {Route} from 'react-router-dom'

//styles
import styled from 'styled-components';

//components
import LeftPanel from '../LeftPanel';
import AdminNavBar from '../AdminNavBar'
// import TextCRUD from '../TextCRUD'
import ListCRUD from "../ListCRUD"
import AddProductForm from '../../../AddProductForm';
import TablaOrdenes from '../../admin/ordenes/TablaOrdenes';
import UserAdmin from '../ordenes/UserAdmin';
import Pagination from '../ordenes/Pagination';




const AdminPanel = () => {
  const [addProduct, setAddProduct] = useState(false);

  return (
    <StyledAdminPanel>
      <div className="left">
        <LeftPanel />
      </div>
      <div className="right">

        <div className="top">
          <AdminNavBar setAddProduct={setAddProduct} />
          <div>
          <Pagination/>
        </div>
        </div>

       
       

        <div className="bottom">
        
           <Route path='/admin/products' component={ListCRUD}/>            
           <Route path='/admin/orders' component={TablaOrdenes}/>    
           <Route path="/admin/users" component={UserAdmin} />

        </div>

        
        <Route path="/admin/add-product">
          <AddProductForm />
        </Route>
      </div>
    </StyledAdminPanel>
  );
};

const StyledAdminPanel = styled.div`
    height: fit-content;
    width: 100%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    .left{
        width:13%;
        z-index: 10;
    }
    .right{
        width:87%;
        display:flex;
        flex-direction:column;
        .top{
            position: fixed;
            height:12vh;
            z-index: 2;
            background: #ffffff;
        }
        .bottom{
            margin-top: 15vh;
            position: relative;
            //background: black;
            height:100vh;
            width: 77vw;
            display:flex;
            justify-content:center;
            align-items:center;
            z-index: 1;
            margin-left: 4rem
        }
        .edit-grid{
            position: absolute;
            z-index: 3;
            background: #eeeeee00;
            top: 12vh;
            width: 85vw;
        }
    }
`;

export default AdminPanel
