export default null;

/**
 * @deprecated
 * 
 * Not implemented
 */

// import {
//   setActiveStyleSheet,
//   readCookie,
//   getPreferredStyleSheet,
//   getActiveStyleSheet,
//   createCookie,
// } from 'styles/styleswitcher';
// import { FluentUIToggle } from 'components/UI/FluentUI/delete_BaseToggle';
// import { Component } from 'react';

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface Props {}

// interface State {
//   isDarkMode: boolean;
// }

// // export function setThemeToggle(isDarkMode : boolean){
// // }

// export class ThemeSelector extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);

//     this.onToggleChange = this.onToggleChange.bind(this);
//     this.applyUserTheme();

//     const themeChoise = getPreferredStyleSheet();

//     this.state = {
//       isDarkMode: themeChoise && themeChoise === 'Dark Mode' ? true : false,
//     };
//   }

//   private applyUserTheme() {
//     const cookie = readCookie('style');
//     const title = cookie ? cookie : getPreferredStyleSheet();
//     setActiveStyleSheet(title);

//     window.onload = function () {
//       const cookie = readCookie('style');
//       const title = cookie ? cookie : getPreferredStyleSheet();
//       setActiveStyleSheet(title);
//     };

//     window.onunload = function () {
//       const title = getActiveStyleSheet();
//       createCookie('style', title, 365);
//     };

//     // window.onresize = function (e: any) {

//     //     let resolution = document.getElementById("resolution");
//     //     if (resolution) {
//     //         resolution.innerText =
//     //             ' W: ' + window.innerWidth +
//     //             ' H: ' + window.innerHeight
//     //     }
//     //     // else
//     //     //     alert('cant find resolution element');

//     //     let viewportMode = document.getElementById("viewport-mode");
//     //     if (viewportMode) {
//     //         let viewport: string = '';

//     //         switch (true) {
//     //             case window.innerWidth >= 1920:
//     //                 viewport = 'Viewport 19'
//     //                 break;
//     //             case window.innerWidth >= 1200:
//     //                 viewport = 'Viewport 12'
//     //                 break;
//     //             case window.innerWidth >= 992:
//     //                 viewport = 'Viewport 9'
//     //                 break;
//     //             case window.innerWidth >= 768:
//     //                 viewport = 'Viewport 7'
//     //                 break;
//     //             case window.innerWidth >= 480:
//     //                 viewport = 'Viewport 4'
//     //                 break;
//     //             default:
//     //                 break;
//     //         }

//     //         viewportMode.innerText = viewport;
//     //     }
//     // };
//   }

//   onToggleChange(_controlId: string, checked?: boolean) {
//     let themeChoice = '';

//     themeChoice = checked ? 'Dark Mode' : 'Light Mode';

//     setActiveStyleSheet(themeChoice);
//   }

//   render() {
//     return (
//       <div className="theme-selection">
//         <FluentUIToggle
//           id="ThemeFilterToggle"
//           label="Dark mode"
//           onToggleChange={this.onToggleChange}
//           inlineLabel={true}
//           defaultChecked={this.state.isDarkMode}
//         />
//         {/* <button onClick={() => setActiveStyleSheet('Light Mode')}>Light Mode</button>
//                 <button onClick={() => setActiveStyleSheet('Dark Mode')}>Dark Mode</button> */}
//         {/* <button onClick={() => setActiveStyleSheet('Accessibility Mode')}>Accessibility Mode</button> */}
//       </div>
//     );
//   }
// }
