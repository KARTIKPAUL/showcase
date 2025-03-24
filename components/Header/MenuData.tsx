import { Menu } from "../../app/types/menu";

const menuData: Menu[] = [
  // {
  //   id: 1,
  //   title: "Home",
  //   path: "/",
  //   newTab: false,
  // },
  {
    id: 2,
    title: "Services",
    path: "/services",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "Custom Software Development",
        path: "/services/custom-software-development",
        newTab: false,
      },
      {
        id: 22,
        title: "Website Development",
        path: "/services/web-development",
        newTab: false,
      },
      {
        id: 23,
        title: "Mobile App Development",
        path: "/services/mobile-app-development",
        newTab: false,
      },
      {
        id: 24,
        title: "IT Consulting",
        path: "/services/it-consulting-digital-transformation",
        newTab: false,
      },
      {
        id: 25,
        title: "Digital Marketing",
        path: "/services/digital-marketing",
        newTab: false,
      },
    ],
  },
  {
    id: 3,
    title: "Showcase",
    path: "/showcase",
    newTab: false,

  },
  {
    id: 4,
    title: "About us",
    path: "/about",
    newTab: false,
  },
  
  {
    id: 5,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
  // {
  //   id: 4,
  //   title: "Pages",
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 21,
  //       title: "Custom Software Development",
  //       path: "/services/custom-software-development",
  //       newTab: false,
  //     },
  //     {
  //       id: 22,
  //       title: "Website Development",
  //       path: "/services/web-development",
  //       newTab: false,
  //     },
  //     {
  //       id: 23,
  //       title: "Mobile App Development",
  //       path: "/services/mobile-app-development",
  //       newTab: false,
  //     },
  //     {
  //       id: 24,
  //       title: "IT Consulting",
  //       path: "/services/it-consulting-digital-transformation",
  //       newTab: false,
  //     },
  //     {
  //       id: 25,
  //       title: "Digital Marketing",
  //       path: "/services/digital-marketing",
  //       newTab: false,
  //     },
  //   ]
  // },
];


// const menuData: Menu[] = [
//   {
//     id: 1,
//     title: "Home",
//     path: "/",
//     newTab: false,
//   },
//   {
//     id: 2,
//     title: "About",
//     path: "/about",
//     newTab: false,
//   },
//   {
//     id: 33,
//     title: "Blog",
//     path: "/blog",
//     newTab: false,
//   },
//   {
//     id: 3,
//     title: "Support",
//     path: "/contact",
//     newTab: false,
//   },
//   {
//     id: 4,
//     title: "Pages",
//     newTab: false,
//     submenu: [
//       {
//         id: 41,
//         title: "About Page",
//         path: "/about",
//         newTab: false,
//       },
//       {
//         id: 42,
//         title: "Contact Page",
//         path: "/contact",
//         newTab: false,
//       },
//       {
//         id: 43,
//         title: "Blog Grid Page",
//         path: "/blog",
//         newTab: false,
//       },
//       {
//         id: 44,
//         title: "Blog Sidebar Page",
//         path: "/blog-sidebar",
//         newTab: false,
//       },
//       {
//         id: 45,
//         title: "Blog Details Page",
//         path: "/blog-details",
//         newTab: false,
//       },
//       {
//         id: 46,
//         title: "Sign In Page",
//         path: "/signin",
//         newTab: false,
//       },
//       {
//         id: 47,
//         title: "Sign Up Page",
//         path: "/signup",
//         newTab: false,
//       },
//       {
//         id: 48,
//         title: "Error Page",
//         path: "/error",
//         newTab: false,
//       },
//     ],
//   },
// ];
export default menuData;
