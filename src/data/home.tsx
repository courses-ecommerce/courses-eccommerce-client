import CoursePage from "src/pages/CoursePage/CoursePage";
// import Contact from "src/pages/MainPage/Contact/Contact";
import HomePage from "src/pages/MainPage/HomePage/HomePage";
import { IComponent } from "src/types";

export const homePageElements: IComponent[] = [
  { id: "", component: <HomePage /> },
  { id: "course", component: <CoursePage /> },
  // { id: "contact", component: <Contact /> },
];
