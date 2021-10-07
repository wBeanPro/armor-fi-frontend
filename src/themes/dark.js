const colors = {
  // primary colors
  secondary: '#fff',
  primary: '#1F2530',
  error: '#F5222D',
  connected: '#4caf50',
  deactivate: '#DC6BE5',
  connectWallet: '#2dbd67',

  // snackbar colors
  snackbarRed: '#ed4337',
  snackbarOrange: 'orange',
  snackbarBlue: '#2F80ED',
  snackbarLightBlack: '#6a6a6a',

  // default colors
  primaryDefault: '#E1E4EB',
  secondaryDefault: '#EDF0F5',
  default: 'rgba(31, 37, 48, 0.25)',
  default50: 'rgba(31, 37, 48, 0.5)', // it's like default but 50% opacity
  _default: '#B8BDC6',
  strongDefault: '#4D5461',
  defaultGradient:
    'linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #E1E4EB 100%)',
  defaultArrow: 'rgba(0, 0, 0, 0.5)',
  disabledDefault: '#F5F6FA',
  disabledText: '#9299A6',

  // active colors
  active: '#1890FF',
  strongActive: '#003A8C',
  lightActive: '#BAE7FF',
  activeBorder: '#40A9FF',
  secondaryLightActive: 'rgba(145, 255, 189, 0.1)',
  primaryLightActive: '#E6F7FF',
  defaultLightActive: '#91D5FF',
  menuItem: '#69C0FF',
  activeSearch: '#4AD481',
  buttonActiveBg: '#096DD9',

  // light colors
  lightSecondary: '#F8F9FC',
  primaryLightTrue: '#91FFBD',
  secondaryLightTrue: '#90fabd',
  defaultLightTrue: '#52C41A',
  activeBorderBox: '#d7f8ef',
  walletInfo: 'rgba(145, 255, 189, 0.11)',

  // bg colors
  activeBg: 'rgba(24, 144, 255, 0.8)',
  headerGradient:
    'linear-gradient(180deg, rgba(196, 196, 196, 0) 62.5%, #B8BDC6 100%)',
  mainBg: 'linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)',
  tabTopBorder: 'rgba(0,0,0,0.1)',
  tabBorder: 'rgba(0,0,0,0.08)',
  tabBorderDark: 'rgba(0,0,0,0.3)',
  secondaryBg: 'rgba(99,99,99,0.1)',
  primaryBorder: 'rgba(24, 144, 255, 1)',
  secondaryBorder: 'rgba(24, 144, 255, 0.1)',
  hoverBorder: 'rgba(24, 144, 255, .5)',
  timeCountText: 'linear-gradient(360deg, #1890FF 13.33%, #91FFBD 120%)',
  homeFooter: '#151B24',
  tableHead: 'linear-gradient(180deg, #ffffff 0%, #edf0f5 100%)',
  modalOverlay: 'rgba(31, 37, 48, 0.3)',
  shadowGradient:
    'linear-gradient( 0deg, rgba(248, 249, 252, 1) 0%, rgba(248, 249, 252, 1) 30%, rgba(248, 249, 252, 0.5) 70%, rgba(248, 249, 252, 0) 100% )',
  walletModalShadow:
    'linear-gradient(0deg, rgba(7, 35, 58, 1) 0%, rgba(7, 35, 58, 0.8) 50%, rgba(7, 35, 58, 0) 100%);',
  startedPulseAnimation:
    'linear-gradient(90deg, rgba(3, 46, 79, 0) 0%, rgba(74, 212, 129, 0.1) 49.55%, rgba(2, 42, 77, 0) 100%), rgba(0, 0, 0, 0.5);',
  finishedPulseAnimation:
    'linear-gradient(90deg, rgba(3, 46, 79, 0) -154.55%, rgba(74, 212, 129, 0.4) 49.59%, rgba(2, 42, 77, 0) 257.44%), rgba(0, 0, 0, 0.5);',
  largeFinishedPulseAnimation:
    'linear-gradient(90deg, rgba(3, 46, 79, 0) -93.42%, rgba(74, 212, 129, 0.2) 50.2%, rgba(2, 42, 77, 0) 196.43%), rgba(0, 0, 0, 0.5);',
  selectedUpdateRow: 'rgba(245, 34, 45, 0.15)',
  selectedCoverRow: 'rgba(24, 144, 255, 0.08)',
  canEditBg: 'rgba(24, 144, 255, 0.2)',
  selectedCoveredRow: 'rgba(245, 34, 45, 0.15)',
  selectedErrorRow: 'rgba(245, 34, 45, 0.15)',
  selectedWarningRow: 'rgba(233, 182, 16, 0.15)',
  transparentBg: 'rgba(0, 0, 0, 0.2)',
  sliderThumb: 'rgba(0, 0, 0, 0.4)',
  homeTransparentButtonBg: 'rgba(145, 255, 189, 0.2)',
  homeLinkBox:
    'radial-gradient(39.45% 58.07% at 3.59% 1.86%, rgba(145, 255, 189, 0.3) 0%, rgba(145, 255, 189, 0) 100%), #000000',
  modalBg: '#07233a',
  tradeBg: 'rgba(4, 4, 4, 0.2)',
  tradeDivider: '#2f4058',
  tradeSkeletonButton: '#0a2a53',
  mainBgGradient:
    'radial-gradient(71.04% 99.3% at 0% 96.63%, rgba(145, 255, 189, 0.6) 0%, rgba(0, 35, 105, 0) 100%), linear-gradient(134.52deg, #0067b1 12.14%, #002369 83.14%);',
  skeletonBg: 'rgba(255, 255, 255, 0.1)',
}

export default {
  type: 'dark',
  colors,
}
