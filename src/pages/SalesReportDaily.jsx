import { IoSearch } from "react-icons/io5";
import { BiExport } from "react-icons/bi";
import ExportedModal from "@/components/common/ExportedModal";
import GrandTotal from "@/components/common/GrandTotal";
import Topbar from "@/components/layout/TopbarSalesReport";
import { useState } from "react";

function SalesReportDaily() {
  const [isExportModalVisible, setExportModal] = useState(false);
  const showExportModal = () => setExportModal(true);
  const closeExport = () => setExportModal(false);

  const handleConfirm = () => {
    closeExport();
  };

  return (
    <div className="main">
      <Topbar />
      <GrandTotal />

      <div className="details mb-3">
        <div>
          <div className="flex flex-col justify-between mt-2 mb-3 h-full bg-card-bg p-2 border border-border-color">
            <div className="flex flex-row w-full mt-2 mb-3">
              <h1 className="w-full">Daily Sales Report</h1>
              <div className="search">
                <div></div>
                <label>
                  <IoSearch className="text-gray-400 mr-2" />
                  <input type="text" placeholder="Search" />
                </label>
              </div>

              <button className="button" onClick={showExportModal}>
                Export <BiExport />
              </button>
            </div>

            <div className="h-0.5 bg-gray-200 w-full mb-2 rounded-full"></div>

            <div className="con-table daily-table p-1 rounded-lg bg-border-color w-full overflow-hidden h-full">
              <div className="table-wrapper-prod table-con bg-card-bg border border-border-color">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Total Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>40.00</td>
                      <td>Non-Coffee</td>
                    </tr>
                    <tr>
                      <td>40.00</td>
                      <td>Non-Coffee</td>
                    </tr>
                    <tr>
                      <td>40.00</td>
                      <td>Non-Coffee</td>
                    </tr>
                    <tr>
                      <td>40.00</td>
                      <td>Non-Coffee</td>
                    </tr>
                    <tr>
                      <td>40.00</td>
                      <td>Non-Coffee</td>
                    </tr>
                    <tr>
                      <td>40.00</td>
                      <td>Non-Coffee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isExportModalVisible && <ExportedModal Exported={handleConfirm} />}
    </div>
  );
}

export default SalesReportDaily;
