import React, { useState } from 'react'
import { Table, InitSort } from "./Table.js";
import tableData from "./data/inclusion_data.json";
import { SortData } from "./UpdateData";


const columns = [
  { label: "Study ID", accessor: "study_id", sortable: true, searchable: false },
  { label: "Site name", accessor: "site_name", sortable: true, searchable: false },
  { label: "Created on", accessor: "created_on", sortable: true, sortbyOrder: "desc", searchable: false },
  { label: "Processing status", accessor: "processing_status", sortable: false, searchable: false }
];


export default function Dashboard() {

  var [initSortField, initSortOrder] = InitSort(columns);

  // Current sorting and search state
  const [sortField, setSortField] = useState(initSortField);
  const [sortOrder, setSortOrder] = useState(initSortOrder);

  var data = SortData(tableData, sortField, sortOrder);

  return (
    <div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">

            <div className="col-lg-3 col-6">
              <div className="info-box">
                <span className="info-box-icon bg-olive"><i className="fa-solid fa-user-plus"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">New samples</span>
                  <span className="info-box-number">80</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="info-box">
                <span className="info-box-icon bg-yellow"><i className="fa-solid fa-list-check"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Approved by pathology</span>
                  <span className="info-box-number">2</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="info-box">
                <span className="info-box-icon bg-cyan"><i className="fa-solid fa-dna"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Sequencing</span>
                  <span className="info-box-number">0</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="info-box">
                <span className="info-box-icon bg-pink"><i className="fa-solid fa-envelope-circle-check"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Data-delivered</span>
                  <span className="info-box-number">1</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="info-box">
                <span className="info-box-icon bg-lightblue"><i className="fa-solid fa-spinner"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Analysis in-progress</span>
                  <span className="info-box-number">0</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="info-box">
                <span className="info-box-icon bg-green"><i className="fa-solid fa-thumbs-up"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Curation completed</span>
                  <span className="info-box-number">0</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="info-box">
                <span className="info-box-icon bg-red"><i className="fa-solid fa-file-lines"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Reports generated</span>
                  <span className="info-box-number">0</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="info-box">
                <span className="info-box-icon bg-blue"><i className="fa-solid fa-users"></i></span>
                <div className="info-box-content">
                  <span className="info-box-text">Total samples</span>
                  <span className="info-box-number">85</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Hospital-wise sample count</h3>
                  </div>
                </div>
                <div className="card-body">

                  <div className="position-relative mb-4">
                    <canvas id="sales-chart" height="200"></canvas>
                  </div>
                  <div className="d-flex flex-row justify-content-end">
                    <span>
                      <i className="fas fa-square text-blue"></i> Count
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Datetime-wise inclusion count</h3>
                  </div>
                </div>
                <div className="card-body">

                  <div className="position-relative mb-4">
                    <canvas id="visitors-chart" height="200"></canvas>
                  </div>
                  <div className="d-flex flex-row justify-content-end">
                    <span>
                      <i className="fas fa-square text-primary"></i> Count
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Latest inclusion details</h3>
                  </div>
                </div>
                <div className="card-body">
                  <div className='table-container'>
                    <Table
                      tableData={data.slice(0, 4)}
                      columns={columns}
                      order={sortOrder}
                      sortField={sortField}
                      handleSort={(accessor, order) => {
                        setSortField(accessor);
                        setSortOrder(order);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div >
  )
}
