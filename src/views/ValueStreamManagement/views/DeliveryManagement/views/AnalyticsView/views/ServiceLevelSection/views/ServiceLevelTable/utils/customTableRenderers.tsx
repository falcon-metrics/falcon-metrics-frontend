
export default null;

/**
 * @deprecated
 * 
 * No logner in use; Migrated from FluentUI to MUI
 */

// import { CSSProperties } from 'react';
// import {
//   DetailsRow,
//   IDetailsRowProps,
//   IDetailsRowStyles,
//   IDetailsHeaderProps,
//   Sticky,
//   IRenderFunction,
//   DetailsHeader,
//   IColumn,
//   IDetailsHeaderStyles,
// } from '@fluentui/react';

// import { getTrendArrowImage } from 'utils/statistics/TrendAnalysis';

// // Custom Service Level Table Styling

// export const renderCustomRow = (
//   props: IDetailsRowProps | undefined
// ) => {
//   if (!props) {
//     return null;
//   }

//   const customStyles: Partial<IDetailsRowStyles> = {
//     root: {
//       fontFamily: 'Open Sans',
//       fontWeight: 400,
//       fontSize: '14px',
//       textAlign: 'center',
//       selectors: {
//         '.ms-DetailsRow-cell': {
//           alignSelf: 'center',
//         },
//       }
//     },
//   };

//   return (
//     <DetailsRow
//       {...props}
//       styles={customStyles}
//     />
//   );
// };

// export const renderCustomHeader: IRenderFunction<IDetailsHeaderProps> = (
//   props,
//   defaultRender,
// ) => {
//   if (!props || !defaultRender) {
//     return null;
//   }

//   const customStyles: Partial<IDetailsRowStyles> = {
//     root: {
//       selectors: {
//         '.ms-DetailsHeader-cellTitle': {
//           justifyContent: 'center',
//         },
//         '.ms-DetailsHeader-cellName': {
//           fontFamily: 'Open Sans',
//           fontWeight: 600,
//           fontSize: '14px',
//         },
//       }
//     },
//   };

//   return (
//     <Sticky>
//       <DetailsHeader
//         {...props}
//         styles={customStyles}
//       />
//     </Sticky>
//   );
// };

// export const renderTypeOfDemand = (
//   item: any,
//   _index: number | undefined,
//   columnInfo: IColumn | undefined
// ) => {
//   if (!columnInfo || !columnInfo.fieldName) {
//     return null;
//   }

//   const typeOfDemand = item[columnInfo.fieldName];

//   if (!typeOfDemand) {
//     return null;
//   }

//   const containerStyles: CSSProperties = {
//     textAlign: 'left',
//   };

//   return (
//     <div style={containerStyles}>
//       {typeOfDemand}
//     </div>
//   );
// };

// export const typeOfDemandStyles: Partial<IDetailsHeaderStyles> = {
//   root: {
//     selectors: {
//       '.ms-DetailsHeader-cellTitle': {
//         fontFamily: 'Open Sans',
//         fontWeight: 600,
//         fontSize: '14px',
//         textAlign: 'left',
//         justifyContent: 'start',
//       }
//     },
//   }
// };

// export const renderServiceLevelExpectation = (
//   item: any,
//   _index: number | undefined,
//   columnInfo: IColumn | undefined
// ) => {
//   if (!columnInfo || !columnInfo.fieldName) {
//     return null;
//   }
//   const serviceLevelExpectationInDaysByProject = item['serviceLevelExpectationInDaysByProject'];
//   if (!serviceLevelExpectationInDaysByProject) {
//     const serviceLevelExpectation = item[columnInfo.fieldName];

//     if (!serviceLevelExpectation) {
//       return null;
//     }

//     const timeUnit: string = (serviceLevelExpectation === 1)
//       ? 'day'
//       : 'days';

//     return (
//       <>
//         {serviceLevelExpectation} {timeUnit} or less
//       </>
//     );
//   }

//   const divs = serviceLevelExpectationInDaysByProject.map((sle, index) => {
//     const timeUnit: string = (sle === 1)
//       ? 'day'
//       : 'days';
//     return (<div style={{ marginBottom: 10 }} key={index}>{sle} {timeUnit} or less</div>);
//   });

//   return (
//     <>
//       {divs}
//     </>
//   );
// };

// export const renderTargetMet = (item: any) => {
//   console.log(`File: customTableRenderers.tsx, Line: 162 -> item`, item);
//   const targetMetByProject = item['targetMetByProject'];
//   if (!targetMetByProject) {
//     const { targetMet } = item;

//     let targetColour = '#ccc';
//     switch (true) {
//       case targetMet < 70:
//         targetColour = '#E1523E';
//         break;
//       case targetMet >= 70 && targetMet <= 84:
//         targetColour = '#F5B24B';
//         break;
//       case targetMet >= 85:
//         targetColour = '#2AD2C9';
//         break;
//       default:
//         break;
//     }

//     const containerStyles: CSSProperties = {
//       display: 'flex',
//       color: targetColour,
//       fontWeight: 'bolder',
//       justifyContent: 'center',
//     };

//     return (
//       <div style={containerStyles}>
//         {`${targetMet}%`}
//       </div>
//     );
//   }

//   const divs = targetMetByProject.map((targetMet, index) => {
//     let targetColour = '#ccc';
//     switch (true) {
//       case targetMet < 70:
//         targetColour = '#E1523E';
//         break;
//       case targetMet >= 70 && targetMet <= 84:
//         targetColour = '#F5B24B';
//         break;
//       case targetMet >= 85:
//         targetColour = '#2AD2C9';
//         break;
//       default:
//         break;
//     }

//     const containerStyles: CSSProperties = {
//       display: 'flex',
//       color: targetColour,
//       fontWeight: 'bolder',
//       justifyContent: 'center',
//       marginBottom: 10
//     };

//     return (
//       <div key={index} style={containerStyles}>
//         {`${targetMet}%`}
//       </div>
//     );
//   });

//   return (
//     <>
//       {divs}
//     </>
//   );
// };

// // Differs Slightly from Summary Table
// export const renderTrendArrow = (
//   item: any,
//   _index: number | undefined,
//   columnInfo: IColumn | undefined
// ) => {
//   if (!columnInfo || !columnInfo.fieldName) {
//     return null;
//   }
//   const trendAnalysisSLE = item[columnInfo.fieldName];
//   const { arrowDirection, arrowColour, text } = trendAnalysisSLE;
//   const imagePath: string = getTrendArrowImage(arrowDirection, arrowColour);

//   const containerStyles: CSSProperties = {
//     display: 'flex',
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   };

//   const imageStyles: CSSProperties = {
//     position: 'relative',
//   };

//   return (
//     <div style={containerStyles}>
//       <img
//         src={imagePath}
//         className="sle-trend-icon"
//         alt={text}
//         style={imageStyles}
//       />
//     </div>
//   );
// };

// export const renderPredictability = (
//   item: any,
//   _index: number | undefined,
//   columnInfo: IColumn | undefined
// ) => {
//   if (!columnInfo || !columnInfo.fieldName) {
//     return null;
//   }
//   const predictability = item[columnInfo.fieldName];

//   if (!predictability) {
//     return null;
//   }

//   const containerStyles: CSSProperties = {
//     textTransform: 'capitalize',
//   };

//   return (
//     <div style={containerStyles}>
//       {predictability}
//     </div>
//   );
// };

// export const renderAmountOfDays = (
//   item: any,
//   _index: number | undefined,
//   columnInfo: IColumn | undefined
// ) => {
//   if (!columnInfo || !columnInfo.fieldName) {
//     return null;
//   }
//   const amountOfDays = item[columnInfo.fieldName];

//   if (amountOfDays === null) {
//     const imagePath: string = getTrendArrowImage('stable', 'grey');

//     const containerStyles: CSSProperties = {
//       display: 'flex',
//       position: 'relative',
//       alignItems: 'center',
//       justifyContent: 'center',
//     };

//     const imageStyles: CSSProperties = {
//       position: 'relative',
//     };

//     return (
//       <div style={containerStyles}>
//         <img
//           src={imagePath}
//           className="sle-trend-icon"
//           style={imageStyles}
//         />
//       </div>
//     );
//   }

//   const timeUnit: string = (amountOfDays === 1)
//     ? 'day'
//     : 'days';

//   return (
//     <>
//       {amountOfDays} {timeUnit}
//     </>
//   );
// };


// export const renderAmountOfDaysArray = (
//   item: any,
//   _index: number | undefined,
//   columnInfo: IColumn | undefined
// ) => {
//   if (!columnInfo || !columnInfo.fieldName) {
//     return null;
//   }
//   const amountOfDays = item[columnInfo.fieldName];

//   if (amountOfDays === null || !Array.isArray(amountOfDays)) {
//     const imagePath: string = getTrendArrowImage('stable', 'grey');

//     const containerStyles: CSSProperties = {
//       display: 'flex',
//       position: 'relative',
//       alignItems: 'center',
//       justifyContent: 'center',
//     };

//     const imageStyles: CSSProperties = {
//       position: 'relative',
//     };

//     return (
//       <div style={containerStyles}>
//         <img
//           src={imagePath}
//           className="sle-trend-icon"
//           style={imageStyles}
//         />
//       </div>
//     );
//   }

//   const daysLabels: string = amountOfDays.length === 1
//     ? `${amountOfDays[0]}`
//     : `[${amountOfDays.toString()}]`;

//   const timeUnit: string = (amountOfDays.length === 1 && amountOfDays[0] === 1)
//     ? 'day'
//     : 'days';

//   return (
//     <>
//       {daysLabels} {timeUnit}
//     </>
//   );
// };
