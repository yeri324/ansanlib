// const libraryData = {
//   '감골도서관': 1,
//   '반월도서관': 2,
//   '부곡도서관': 3,
//   '본오도서관': 4
// };


// export const getLibraryNum = (libName) => {
//   return libraryData[libName] || null;

// };




export const getLibraryNum = (selectedLibrary) => {
  return selectedLibrary === '감골도서관' ? '7004' :
    selectedLibrary === '반월도서관' ? '7008' :
    selectedLibrary === '상록어린이도서관' ? '7007' :
    selectedLibrary === '부곡도서관' ? '7011' :
    selectedLibrary === '본오도서관' ? '7026' :
    selectedLibrary === '성포도서관' ? '7003' :
    selectedLibrary === '상록수도서관' ? '7006' :
    selectedLibrary === '수암도서관' ? '7023' :
    selectedLibrary === '관산도서관' ? '7002' :
    selectedLibrary === '단원어린이도서관' ? '7005' :
    selectedLibrary === '미디어도서관' ? '7014' :
    selectedLibrary === '선부도서관' ? '7028' :
    selectedLibrary === '원고잔도서관' ? '7018' :
    '';
};