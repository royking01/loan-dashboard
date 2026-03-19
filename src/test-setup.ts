// src/test-setup.ts

// 1. Import Zone.js first
import 'zone.js'; // required by Angular
import 'zone.js/testing'; // sets up Zone.js for Angular testing

// 2. Then import Jest preset Angular zone helpers
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

// 3. Initialize the Angular testing environment
setupZoneTestEnv();
