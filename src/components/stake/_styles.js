export default (theme) => {
  const { colors, breakpoints } = theme
  return {
    root: {
      flex: 1,
      maxWidth: '965px',
      width: '100%',
      margin: '0 auto',
      padding: '24px 10px 36px',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '22px',
      lineHeight: '30px',
      textAlign: 'center',
      color: colors.primary,
    },
    mainBox: {
      maxWidth: '694px',
      width: '100%',
      margin: '32px auto 0',
      background: colors.mainBg,
      borderRadius: '6px',
      padding: '30px 20px',
      position: 'relative',
    },
    subTitle: {
      fontWeight: 'bold',
      fontSize: '22px',
      lineHeight: '30px',
      textAlign: 'center',
      color: colors.secondary,
      position: 'relative',
      zIndex: '1',
    },
    info: {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '22px',
      textAlign: 'center',
      color: colors.secondary,
      marginTop: '18px',
      position: 'relative',
      zIndex: '1',
    },
    actionContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
      position: 'relative',
      zIndex: '1',
    },
    actionButton: {
      background: colors.secondary,
      borderRadius: '6px',
      padding: '8px 22px',
      boxShadow: 'none',
      '&.MuiButton-contained.Mui-disabled': {
        background: colors.primaryDefault,
        '& h5': {
          color: colors.disabledText,
        },
      },
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '19px',
      letterSpacing: '0.02em',
      color: colors.active,
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginLeft: '10px',
      },
    },
    bgIconPrimary: {
      position: 'absolute',
      left: '27px',
      bottom: '26px',
    },
    activeBtnText: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '19px',
      letterSpacing: '0.02em',
      color: colors.secondary,
      textTransform: 'uppercase',
    },
    activeBtn: {
      background: colors.active,
      boxShadow: `0px 0px 12px ${colors.defaultLightActive}`,
      borderRadius: '6px',
      zIndex: '4',
      padding: '6px 12px',
      '&:hover': {
        background: colors.active,
      },
      '&.MuiButton-contained.Mui-disabled': {
        '& h4': {
          color: colors.disabledText,
        },
      },
    },
    bgIconSecondary: {
      position: 'absolute',
      left: '123px',
      top: '38px',
      transform: 'rotateZ(35deg)',
    },
    assetsTitle: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '19px',
      letterSpacing: '0.02em',
      color: colors.active,
    },
    assetsLogo: {
      display: 'flex',
      alignItems: 'center',
      padding: '13px 15px',
      cursor: 'pointer',
      '& img': {
        marginRight: '6px',
      },
      [breakpoints.down('xs')]: {
        padding: '8px 9px',
      },
    },
    rowHead: {
      borderBottom: `1px solid ${colors.primaryDefault}`,
    },
    row: {
      borderBottom: `1px solid ${colors.primaryDefault}`,
      minHeight: '51px',
      '&:last-of-type': {
        borderBottom: 'none',
      },
      [breakpoints.down('xs')]: {
        minHeight: 'unset',
      },
    },
    cell: {
      padding: '14px 16px',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '19px',
      textAlign: 'right',
      color: colors.primary,
      [breakpoints.down('xs')]: {
        padding: '8px 10px',
      },
      '&.btnCell': {
        padding: '5px 16px',
      },
    },
    tableTitle: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '19px',
      letterSpacing: '0.02em',
      color: colors.primary,
      padding: '15px',
      [breakpoints.down('xs')]: {
        fontSize: '14px',
        lineHeight: '17px',
        padding: '8px 10px',
      },
    },
    tableContainer: {
      background: colors.secondary,
      boxShadow: `0px 0px 14px ${colors.primaryDefault}`,
      borderRadius: '6px',
      marginTop: '23px',
      '& td': {
        border: 'none',
      },
      '& th': {
        border: 'none',
      },
      [breakpoints.down('sm')]: {
        maxWidth: '750px',
        width: '100%',
        margin: '23px auto 0',
      },
    },
    textExpired: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '19px',
      textAlign: 'right',
      color: colors.error,
    },
    stakedSymbol: {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '26px',
      textAlign: 'center',
      color: colors.strongDefault,
      marginTop: '36px',
    },
    table: {
      [breakpoints.down('sm')]: {
        width: '750px',
        overflowX: 'scroll',
      },
      [breakpoints.down('xs')]: {
        width: '700px',
      },
    },
  }
}
