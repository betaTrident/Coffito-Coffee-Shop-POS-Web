import { BiExport } from "react-icons/bi";
import cup_icon_1 from "@/assets/coffee-cup.png";
import cup_icon_2 from "@/assets/coffee-sold.png";
import sales from "@/assets/sales.png";
import ExportedModal from "@/components/common/ExportedModal";
import DateTime from "@/components/layout/DateTime";
import { useState } from "react";

function Dashboard() {
  const [isExportModalVisible, setExportModal] = useState(false);
  const showExportModal = () => setExportModal(true);
  const closeExport = () => setExportModal(false);

  const handleConfirm = () => {
    showExportModal();
    closeExport();
  };

  return (
    <div className="main">
      <div className="topbar-con">
        <h2>Dashboard</h2>
        <DateTime />
      </div>

      <div className="flex h-full bg-primary-bg">
        <div className="h-full w-full">
          <div className="col-1">
            <div className="card-con-sales">
              <div className="card-con-sales-div">
                <h2>Total Sales</h2>
                <div className="dashboard-text-con">
                  <img src={sales} alt="" />
                  <span>45</span>
                </div>
              </div>
              <div className="card-con-sales-div">
                <h2>Total Cups Sold</h2>
                <div className="dashboard-text-con">
                  <img src={cup_icon_1} alt="" />
                  <span>45</span>
                </div>
              </div>
              <div className="card-con-sales-div">
                <h2>Total Products</h2>
                <div className="dashboard-text-con">
                  <img src={cup_icon_2} alt="" /> <span>34</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between mt-2 mb-3 h-full bg-card-bg p-2 border border-border-color">
              <div className="flex justify-between mt-2 mb-3">
                <h2>Daily Sales</h2>
                <button className="exportButton" onClick={showExportModal}>
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

        <div className="h-full w-[40%] pb-3">
          <div className="col-2 pr-5">
            <div className="best-selling-main-con">
              <div className="cardHeader">
                <h2>Best Selling</h2>
              </div>
              <div className="best-selling">
                <div className="card-con">
                  <div className="prod-con">
                    <img src={cup_icon_1} alt="" />
                  </div>
                  <span>American Vanilla</span>
                </div>
                <div className="card-con">
                  <div className="prod-con">
                    <img src={cup_icon_1} alt="" />
                  </div>
                  <span>American Vanilla</span>
                </div>
                <div className="card-con">
                  <div className="prod-con">
                    <img src={cup_icon_1} alt="" />
                  </div>
                  <span>American Vanilla</span>
                </div>
                <div className="card-con">
                  <div className="prod-con">
                    <img src={cup_icon_1} alt="" />
                  </div>
                  <span>American Vanilla</span>
                </div>
                <div className="card-con">
                  <div className="prod-con">
                    <img src={cup_icon_1} alt="" />
                  </div>
                  <span>American Vanilla</span>
                </div>
                <div className="card-con">
                  <div className="prod-con">
                    <img src={cup_icon_1} alt="" />
                  </div>
                  <span>American Vanilla</span>
                </div>
                <div className="card-con">
                  <div className="prod-con">
                    <img src={cup_icon_1} alt="" />
                  </div>
                  <span>American Vanilla</span>
                </div>
              </div>
            </div>
          </div>
          {isExportModalVisible && <ExportedModal Exported={handleConfirm} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
