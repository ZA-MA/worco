
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {Link} from "react-router-dom";
import Entry from "./components/Entry";
import InteractiveMap from "./components/InteractiveMap";
import Testmap from "./components/testmap";
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";



createRoot(document.getElementById('container')).render(<InteractiveMap />);
