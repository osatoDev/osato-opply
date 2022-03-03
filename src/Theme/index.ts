import { makeStyles } from "@mui/styles";
import { css } from '@emotion/react';
import { createTheme  } from '@material-ui/core/styles';
import COLORS from '../lib/colors';

export const useStyles = makeStyles((theme) => ({
    container: {
      height: "100vh",
    },
    paper: {
      padding: 50,
      borderRadius: 20,
    },
    form: {
      marginTop: 50,
      marginLeft: 50,
    },  
    padder: {
      marginTop: 20,
    },
    smallPadder: {
      marginTop: 10,
    },
    label: {
      marginBottom: 2,
    },
    purple: {
      textDecoration: "underline",
    },
    input: {
      backgroundColor: "white !important",
    },
    error: {
      fontSize: "32px",
      color: "#f83245",
      fontWeight: 400,
      marginTop: 20,
    },
  }));



const MuiTheme = createTheme({
  palette: {
    primary: {
     // main: '#414EE3' // Dark Purple
     main: '#B4A7FF'
    },
    secondary: {
      main: '#B4A7FF',
      dark: COLORS.silver
      // Light purple
    },
    error: {
      main: '#f83245',    
    }
  },
  shape: {
    // borderRadius: '0.5rem'
  },
  overrides: {
    /* input style overrides */
    MuiInputBase: {
      input: {
        fontSize: 12,
        color: '#4F4F4F',
        fontWeight: 200,
        WebkitBoxShadow: "0 0 0 1000px transparent inset"
      }
    },
    MuiOutlinedInput: {
      root: {
        //minWidth: 300,
        height: 35,
        borderRadius: 8,
      }
    },
    MuiFilledInput: {
      root: {
        minWidth: 300,
        

        //  backgroundColor: vars.inputBackground,
        //  color: vars.inputColor,
        borderRadius: '8px !important',

        '&:hover': {
          //    backgroundColor: vars.inputHoverBakground
        },
        '&$focused': {
          //    borderColor: vars.inputFocusBorder,
          //    backgroundColor: vars.inputFocusBakground
        },
        '&$error': {
          //   border: `1px solid ${vars.inputErrorBorder}`,
          //  color: vars.inputErrorBakground
        }
      },
      underline: {
        //backgroundColor: vars.inputBackground,
        '&:before, &:after': {
          display: 'none'
        }
      },
      adornedEnd: {
        paddingRight: 5,
        // color: vars.inputAdornedEnd,
        cursor: 'pointer'
      },
      input: {
        paddingTop: 18.5,
        paddingBottom: 18.5,
        // borderRadius: 8,
        // height: 16.625,
        height: 'auto',
        lineHeight: 1,
        cursor: 'pointer'
      },
      multiline: {
        paddingTop: 10
      }
    },
    MuiFormControl: {
      root: {
        border: 0,
      },
      marginNormal: {
        margin: '0 !important'
      }
    },
    /* end of input style overrides */
    MuiButton: {
      text: {
        paddingLeft: '14px',
        paddingRight: '14px',
        fontSize: '13px'
      },
      containedSizeSmall: {
        paddingLeft: '14px',
        paddingRight: '14px'
      },
      root: {
        textTransform: 'none',
        fontWeight: 'normal',
        borderRadius: 20,
        height: 42,
      }
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    h1: {
      fontSize: 40,
      fontWeight: 400,
      color: COLORS.dark
    },
    h2: {
      fontSize: 34,
      fontWeight: 400,
      color: COLORS.dark
    },
    h3: {
      fontSize: 30,
      fontWeight: 500,
      color: COLORS.dark
    },
    h4: {
      fontSize: 28,
      fontWeight: 400,
      color: COLORS.dark
    },
    h5: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.dark
    },
    h6: {
      fontSize: 22,
      fontWeight: 400,
      color: COLORS.dark
    },
    subtitle1: {
      fontSize: 20,
      fontWeight: 400,
      color: COLORS.dark
    },
    subtitle2: {
      fontSize: 18,
  
      color: COLORS.dark
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      // letterSpacing: '1px',
      // wordSpacing: '1.5px',
      color: COLORS.dark
    },
    body2: {
      fontSize: 14,
  
      // lineHeight: 1.43,
      //color: COLORS.dark
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      // lineHeight: 1.43,
      // letterSpacing: '1px',
      // wordSpacing: '1.5px',
    },
    overline: {
      fontSize: 10,
      textTransform: 'uppercase'
    },
    button: {
      textTransform: 'uppercase',
      fontSize: 14,
      fontWeight: 500
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  },
});

export const globalStyles = css`
  input:-webkit-autofill {
    background-color: white !important;
  }
  webkit-box-shadow: 0 0 0 30px white inset !important;

  #password:-webkit-autofill {
    background-color: white !important;
  }

 

  .MuiSelect-select:focus {
    border-radius: 0;
    background-color: transparent;
  }

  .MuiOutlinedInput-input:-webkit-autofill {
    border-radius: inherit;
    height: 0;
  }
`;

export default MuiTheme;