import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { Flag } from 'react-flag-kit';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { countries } from 'countries-list'; // Import countries object directly
import {  useGoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from "react-google-recaptcha";
// layout 
import SuperAdminLayout from '../../../layouts/SuperAdminLayout/SuperAdminLayout';
import zxcvbn from "zxcvbn"; // You may need to install this library
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Importer les icônes de l'œil

// components 
import { NioButton, NioToaster, NioCard, NioBrand, NioField ,NioSection} from '../../../components';

export default function SuperAdmin() {

  
  return (
    <NioSection className="bg-purple-100" style={{ marginTop: '-70px' }} masks={["shape-18"]}  >
    <SuperAdminLayout title="SuperAdmin" rootClass="layout-1" >
      
     
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" >
        <NioCard.Body>
         
          
        </NioCard.Body>
      </NioCard>
    </SuperAdminLayout></NioSection>
  )
}
