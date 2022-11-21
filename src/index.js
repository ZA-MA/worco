
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {Link} from "react-router-dom";
import Entry from "./components/Entry";
import InteractiveMap from "./components/InteractiveMap";



createRoot(document.getElementById('container')).render(<App />);
