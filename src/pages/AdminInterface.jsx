import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "@/pages/Dashboard";
import Product from "@/pages/Product";
import SalesReportDaily from "@/pages/SalesReportDaily";
import SalesReportMonthly from "@/pages/SalesReportMonthly";
import SalesReportYearly from "@/pages/SalesReportYearly";
import Transaction from "@/pages/Transaction";
import ItemSold from "@/pages/ItemSold";
import Accounts from "@/pages/Accounts";

function AdminInterface({ onLogout }) {
  return (
    <Router>
      <div className="flex w-full h-full">
        {/* Sidebar with fixed width */}
        <div className="w-[230px] relative">
          <Sidebar onLogout={onLogout} />
        </div>

        {/* Main content */}
        <div className="flex-grow relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/sales-report/daily" element={<SalesReportDaily />} />
            <Route path="/sales-report/monthly" element={<SalesReportMonthly />} />
            <Route path="/sales-report/yearly" element={<SalesReportYearly />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/item-sold" element={<ItemSold />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AdminInterface;
