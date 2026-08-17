import LandingPage, { LandingPagePartner } from './LandingPage'
import SheetsIndex from './sheets/SheetsIndex'
import AssistSheet from './sheets/AssistSheet'
import ConnectSheet from './sheets/ConnectSheet'
import ConnectTiers from './sheets/ConnectTiers'
import AssistConnectSheet from './sheets/AssistConnectSheet'

// Set VITE_MODE=partner in .env.local to show the Connect + Assist-only variant.
// Set VITE_MODE=full (or leave unset) to show the complete website.
const MODE = import.meta.env.VITE_MODE || 'full'

const SHEET_ROUTES = {
  '/sheets': SheetsIndex,
  '/sheets/assist': AssistSheet,
  '/sheets/connect': ConnectSheet,
  '/sheets/connect-tiers': ConnectTiers,
  '/sheets/assist-connect': AssistConnectSheet,
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const SheetPage = SHEET_ROUTES[path]
  if (SheetPage) return <SheetPage />
  return MODE === 'partner' ? <LandingPagePartner /> : <LandingPage />
}
