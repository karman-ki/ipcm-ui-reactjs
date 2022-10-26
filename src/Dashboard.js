import React, { useState, Component } from 'react'
import Table from "./Table.js";
import {InitSort} from "./Table.js";
import tableData from "./inclusion_data.json";
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
      {/* Content Header (Page header) */}

      <section className="content">
        <div className="container-fluid">
          <div className="row">

            <div className="col-lg-3 col-6">
              <div class="info-box">
                <span class="info-box-icon bg-olive"><i class="fa-solid fa-user-plus"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">New samples</span>
                  <span class="info-box-number">80</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div class="info-box">
                <span class="info-box-icon bg-yellow"><i class="fa-solid fa-list-check"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Approved by pathology</span>
                  <span class="info-box-number">2</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div class="info-box">
                <span class="info-box-icon bg-cyan"><i class="fa-solid fa-dna"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Sequencing</span>
                  <span class="info-box-number">0</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div class="info-box">
                <span class="info-box-icon bg-pink"><i class="fa-solid fa-envelope-circle-check"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Data-delivered</span>
                  <span class="info-box-number">1</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div class="info-box">
                <span class="info-box-icon bg-lightblue"><i class="fa-solid fa-spinner"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Analysis in-progress</span>
                  <span class="info-box-number">0</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div class="info-box">
                <span class="info-box-icon bg-green"><i class="fa-solid fa-thumbs-up"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Curation completed</span>
                  <span class="info-box-number">0</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div class="info-box">
                <span class="info-box-icon bg-red"><i class="fa-solid fa-file-lines"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Reports generated</span>
                  <span class="info-box-number">0</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div class="info-box">
                <span class="info-box-icon bg-blue"><i class="fa-solid fa-users"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Total samples</span>
                  <span class="info-box-number">85</span>
                </div>
              </div>
            </div>

          </div>


          <div className="row">

            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Hospital-wise sample count</h3>
                  </div>
                </div>
                <div class="card-body">

                  <div class="position-relative mb-4">
                    <canvas id="sales-chart" height="200"></canvas>
                  </div>
                  <div class="d-flex flex-row justify-content-end">
                    <span>
                      <i class="fas fa-square text-blue"></i> Count
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Datetime-wise inclusion count</h3>
                  </div>
                </div>
                <div class="card-body">

                  <div class="position-relative mb-4">
                    <canvas id="visitors-chart" height="200"></canvas>
                  </div>
                  <div class="d-flex flex-row justify-content-end">
                    <span>
                      <i class="fas fa-square text-primary"></i> Count
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="card">
                <div class="card-header border-0">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title">Latest inclusion details</h3>
                  </div>
                </div>
                <div class="card-body">
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
      {/* /.content */}
    </div >
  )
}
