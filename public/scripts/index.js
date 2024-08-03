const serverUrl = 'http://localhost:3002';

window.onclick = function(event) {
  if (event.target == document.getElementById('regSampleModal')) {
    document.getElementById('regSampleModal').style.display = "none";
  }
  if (event.target == document.getElementById('resultSampleModal')) {
    document.getElementById('resultSampleModal').style.display = "none";
  }
}

const testCategories = {
  Haematology: [
    { name: 'Complete Blood Count (CBC)', price: 500 },
    { name: 'Erythrocyte Sedimentation Rate (ESR)', price: 300 },
    { name: 'Hemoglobin (Hb)', price: 200 },
    { name: 'Platelet Count', price: 250 },
    { name: 'White Blood Cell Count (WBC)', price: 350 },
    { name: 'Red Blood Cell Count (RBC)', price: 300 },
    { name: 'Hematocrit (Hct)', price: 250 },
    { name: 'Mean Corpuscular Volume (MCV)', price: 200 },
    { name: 'Mean Corpuscular Hemoglobin (MCH)', price: 200 },
    { name: 'Mean Corpuscular Hemoglobin Concentration (MCHC)', price: 200 },
    { name: 'Red Cell Distribution Width (RDW)', price: 200 },
    { name: 'Reticulocyte Count', price: 350 },
    { name: 'Peripheral Blood Smear', price: 400 },
    { name: 'Prothrombin Time (PT)', price: 450 },
    { name: 'Activated Partial Thromboplastin Time (aPTT)', price: 500 },
    { name: 'International Normalized Ratio (INR)', price: 300 },
    { name: 'Fibrinogen', price: 600 },
    { name: 'D-Dimer', price: 700 },
    { name: 'Eosinophil Count', price: 250 },
    { name: 'Basophil Count', price: 250 },
    { name: 'Lymphocyte Count', price: 250 },
    { name: 'Monocyte Count', price: 250 },
    { name: 'Neutrophil Count', price: 250 },
    { name: 'Iron Studies', price: 800 },
    { name: 'Vitamin B12 and Folate', price: 900 },
    { name: 'Bone Marrow Aspiration', price: 1000 }
  ],
  Chemistry: [
    { name: 'Blood Glucose (Fasting)', price: 400 },
    { name: 'Lipid Profile', price: 700 },
    { name: 'Renal Function Test (RFT)', price: 800 },
    { name: 'Liver Function Test (LFT)', price: 750 },
    { name: 'Serum Electrolytes', price: 600 },
    { name: 'Calcium', price: 400 },
    { name: 'Phosphorus', price: 400 },
    { name: 'Magnesium', price: 450 },
    { name: 'Uric Acid', price: 350 },
    { name: 'Albumin', price: 300 },
    { name: 'Total Protein', price: 350 },
    { name: 'Alkaline Phosphatase (ALP)', price: 400 },
    { name: 'Alanine Aminotransferase (ALT)', price: 450 },
    { name: 'Aspartate Aminotransferase (AST)', price: 450 },
    { name: 'Gamma-Glutamyl Transferase (GGT)', price: 500 },
    { name: 'Bilirubin (Total and Direct)', price: 400 },
    { name: 'Creatinine', price: 350 },
    { name: 'Blood Urea Nitrogen (BUN)', price: 350 },
    { name: 'Cholesterol', price: 400 },
    { name: 'Triglycerides', price: 400 },
    { name: 'High-Density Lipoprotein (HDL)', price: 450 },
    { name: 'Low-Density Lipoprotein (LDL)', price: 450 },
    { name: 'Thyroid Function Tests (TFT)', price: 800 },
    { name: 'HbA1c', price: 500 },
    { name: 'C-Reactive Protein (CRP)', price: 550 },
    { name: 'Procalcitonin', price: 700 },
    { name: 'Amylase', price: 500 },
    { name: 'Lipase', price: 500 },
    { name: 'Lactate Dehydrogenase (LDH)', price: 550 }
  ],
  Microbiology: [
    { name: 'Urine Culture', price: 600 },
    { name: 'Blood Culture', price: 900 },
    { name: 'Sputum Culture', price: 700 },
    { name: 'Stool Culture', price: 650 },
    { name: 'Throat Swab Culture', price: 500 },
    { name: 'Wound Swab Culture', price: 600 },
    { name: 'CSF Culture', price: 1000 },
    { name: 'Pus Culture', price: 700 },
    { name: 'Pleural Fluid Culture', price: 950 },
    { name: 'Peritoneal Fluid Culture', price: 950 },
    { name: 'Endocervical Swab Culture', price: 800 },
    { name: 'Urethral Swab Culture', price: 800 },
    { name: 'Nail Clipping Culture', price: 600 },
    { name: 'Fungal Culture', price: 900 },
    { name: 'TB Culture', price: 1100 },
    { name: 'AFB Staining', price: 500 },
    { name: 'Gram Staining', price: 300 },
    { name: 'Z-N Staining', price: 350 },
    { name: 'Catalase Test', price: 250 },
    { name: 'Coagulase Test', price: 300 },
    { name: 'Oxidase Test', price: 250 },
    { name: 'API 20E', price: 1000 },
    { name: 'API 20C AUX', price: 1000 },
    { name: 'API Staph', price: 1000 },
    { name: 'API Strep', price: 1000 },
    { name: 'Antibiotic Sensitivity Test (AST)', price: 600 },
    { name: 'Viral Load Test', price: 1200 },
    { name: 'Malaria Parasite Test', price: 300 },
    { name: 'H. pylori Stool Antigen', price: 700 }
  ],
  Serology: [
    { name: 'HIV Test', price: 200 },
    { name: 'Hepatitis B Test', price: 250 },
    { name: 'Hepatitis C Test', price: 300 },
    { name: 'Syphilis Test (VDRL)', price: 350 },
    { name: 'Dengue NS1 Antigen', price: 400 },
    { name: 'Widal Test', price: 250 },
    { name: 'Rheumatoid Factor (RF)', price: 300 },
    { name: 'Anti-Nuclear Antibody (ANA)', price: 600 },
    { name: 'C-Reactive Protein (CRP)', price: 550 },
    { name: 'Procalcitonin', price: 700 },
    { name: 'ASO Titer', price: 350 },
    { name: 'Toxoplasma IgG/IgM', price: 400 },
    { name: 'Rubella IgG/IgM', price: 400 },
    { name: 'Cytomegalovirus (CMV) IgG/IgM', price: 450 },
    { name: 'Epstein-Barr Virus (EBV) IgG/IgM', price: 500 },
    { name: 'H. pylori IgG', price: 350 },
    { name: 'Chikungunya IgG/IgM', price: 450 },
    { name: 'Leptospira IgG/IgM', price: 500 },
    { name: 'Brucella IgG/IgM', price: 450 },
    { name: 'Anti-dsDNA', price: 600 },
    { name: 'Anti-CCP', price: 700 },
    { name: 'Anti-Smith', price: 650 },
    { name: 'Anti-RNP', price: 650 },
    { name: 'Anti-SSA (Ro)', price: 700 },
    { name: 'Anti-SSB (La)', price: 700 },
    { name: 'Anti-Histone', price: 650 },
    { name: 'Anti-Jo1', price: 700 },
    { name: 'Anti-Mi2', price: 700 }
  ],
  'Ultra-Sound': [
    { name: 'Abdominal Ultrasound', price: 1200 },
    { name: 'Pelvic Ultrasound', price: 1000 },
    { name: 'Obstetric Ultrasound', price: 1500 },
    { name: 'Thyroid Ultrasound', price: 1100 },
    { name: 'Breast Ultrasound', price: 1300 },
    { name: 'Renal Ultrasound', price: 1250 },
    { name: 'Scrotal Ultrasound', price: 1150 },
    { name: 'Transvaginal Ultrasound', price: 1400 },
    { name: 'Transrectal Ultrasound', price: 1350 },
    { name: 'Carotid Ultrasound', price: 1500 },
    { name: 'Venous Doppler Ultrasound', price: 1550 },
    { name: 'Arterial Doppler Ultrasound', price: 1550 },
    { name: 'Musculoskeletal Ultrasound', price: 1600 },
    { name: 'Neck Ultrasound', price: 1300 },
    { name: 'Soft Tissue Ultrasound', price: 1200 },
    { name: 'Liver Ultrasound', price: 1250 },
    { name: 'Gallbladder Ultrasound', price: 1250 },
    { name: 'Pancreas Ultrasound', price: 1250 },
    { name: 'Spleen Ultrasound', price: 1250 },
    { name: 'Aortic Ultrasound', price: 1400 },
    { name: 'Renal Artery Doppler', price: 1600 },
    { name: 'Pelvic Doppler', price: 1500 },
    { name: 'Obstetric Doppler', price: 1600 },
    { name: 'Fetal Ultrasound', price: 1700 },
    { name: 'Prostate Ultrasound', price: 1450 },
    { name: 'Appendix Ultrasound', price: 1300 },
    { name: 'Bladder Ultrasound', price: 1250 },
    { name: 'Pediatric Ultrasound', price: 1800 },
    { name: 'Joint Ultrasound', price: 1650 },
    { name: 'Lymph Node Ultrasound', price: 1300 }
  ]
};




let selectedTests = [];

        function openTestRunModal() {
            const modal = document.getElementById('testRunModal');
            const categoriesDiv = document.getElementById('testCategories');
            categoriesDiv.innerHTML = '';

            for (const category in testCategories) {
                const categoryDiv = document.createElement('div');
                categoryDiv.innerHTML = `<h3>${category}</h3>`;

                testCategories[category].forEach(test => {
                    const isChecked = selectedTests.includes(test.name);
                    const testDiv = document.createElement('div');
                    testDiv.innerHTML = `
                        <label>
                            <input type="checkbox" class="test-checkbox" data-name="${test.name}" data-price="${test.price}" ${isChecked ? 'checked' : ''}>
                            ${test.name} - ${test.price}
                        </label>`;
                    categoryDiv.appendChild(testDiv);
                });

                categoriesDiv.appendChild(categoryDiv);
            }

            modal.style.display = 'block';
        }

        function closeTestRunModal() {
            const modal = document.getElementById('testRunModal');
            modal.style.display = 'none';

            window.onclick = function(event) {
                if (event.target == document.getElementById('testRunModal')) {
                    document.getElementById('testRunModal').style.display = "none";
                }
            }
        }

        function applySelectedTests() {
            selectedTests = [];
            let totalBill = 0;

            const checkboxes = document.querySelectorAll('.test-checkbox:checked');
            checkboxes.forEach(checkbox => {
                selectedTests.push(checkbox.getAttribute('data-name'));
                totalBill += parseFloat(checkbox.getAttribute('data-price'));
            });

            document.getElementById('testRun').value = selectedTests.join(', ');
            document.getElementById('totalBill').value = totalBill.toFixed(2);

            closeTestRunModal();
        }

        async function fetchSampleIds() {
            try {
                const response = await fetch(`${serverUrl}/getNextSampleId`);
                const data = await response.json();

                if (!data.nextSampleId) {
                    throw new Error("Invalid response for next sample ID");
                }

                return data.nextSampleId;
            } catch (error) {
                console.error('Error fetching sample IDs:', error);
                throw error;
            }
        }

        async function setNextSampleId() {
            try {
                const nextId = await fetchSampleIds();
                document.getElementById('nextSampleId').value = nextId;
            } catch (error) {
                console.error('Error setting next sample ID:', error);
            }
        }

        async function submitForm(sampleType, collectionDate, owner, age, sex, testRun, emailPhone, referral, totalBill, amountPaid) {
          let action = "submitSample";
          // Collect staffCode from the input field
          const staffCode = document.getElementById('staffCode').value;
          // Collect testRun from the input field
          testRun = document.getElementById('testRun').value;
          // Collect emailPhone from the input field
          emailPhone = document.getElementById('emailPhone').value;
          // Collect referral from the input field
          referral = document.getElementById('referral').value;
          // Collect totalBill from the input field
          totalBill = parseFloat(document.getElementById('totalBill').value);
          // Collect amountPaid from the input field
          amountPaid = parseFloat(document.getElementById('amountPaid').value);
          sampleType = document.getElementById('sampleType').value;
          collectionDate = document.getElementById('collectionDate').value;
          owner = document.getElementById('owner').value;
          age = document.getElementById('age').value;
          sex = document.getElementById('sex').value;

        
          // Create a form data object with all parameters
          const formDataObj = {
            action,
            staffCode,
            sampleType,
            collectionDate,
            owner,
            age,
            sex,
            testRun,
            emailPhone,
            referral,
            totalBill,
            amountPaid
          };
        
          // Debugging: Log the collected form data
          console.log('Collected form data:', formDataObj);
        
          showLoading();
        
          try {
            const response = await fetch(`${serverUrl}/submitSample`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formDataObj) // Send JSON data
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            console.log('Form submitted:', data);
        
            // Update next sample ID after successful submission
            setNextSampleId();
        
            // Reset the form and hide loading indicator
            setTimeout(() => {
              document.getElementById('sampleForm').reset();
              hideLoading();
              showModal(document.getElementById('nextSampleId').value);
            }, 1500);
          } catch (error) {
            console.error('Error:', error);
            hideLoading();
          } finally {
            // Clear selected tests after form submission
            selectedTests = [];
            document.getElementById('testRun').value = '';
            document.getElementById('totalBill').value = '';
          }
        }
        
        

        function showLoading() {
            const loadingDiv = document.getElementById('loadingIndicator');
            loadingDiv.style.display = 'block';
        }
        function showSuccess() {
            const loadingDiv = document.getElementById('successIndicator');
            loadingDiv.style.display = 'block';
        }

        function hideLoading() {
            const loadingDiv = document.getElementById('loadingIndicator');
            loadingDiv.style.display = 'none';
        }
        function hideSuccess() {
            const loadingDiv = document.getElementById('successIndicator');
            loadingDiv.style.display = 'none';
        }

        function printInvoice() {
            const invoice = document.getElementById('invoice');
            const form = document.getElementById('sampleForm');
            const formData = new FormData(form);

            document.getElementById('invoiceSampleId').innerText = document.getElementById('nextSampleId').textContent;
            document.getElementById('invoiceSampleType').innerText = formData.get('sampleType');
            document.getElementById('invoiceCollectionDate').innerText = formData.get('collectionDate');
            document.getElementById('invoiceOwner').innerText = formData.get('owner');
            document.getElementById('invoiceAge').innerText = formData.get('age');
            document.getElementById('invoiceSex').innerText = formData.get('sex');
            document.getElementById('invoiceTestRun').innerText = formData.get('testRun');
            document.getElementById('invoiceEmailPhone').innerText = formData.get('emailPhone');
            document.getElementById('invoiceReferral').innerText = formData.get('referral');
            document.getElementById('invoiceTotalBill').innerText = formData.get('totalBill');
            document.getElementById('invoiceAmountPaid').innerText = formData.get('amountPaid');

            const balance = parseFloat(formData.get('totalBill')) - parseFloat(formData.get('amountPaid'));
            document.getElementById('invoiceBalance').innerText = balance > 0 ? balance.toFixed(2) : 'None';

            document.getElementById('invoiceStaffCode').innerText = formData.get('staffCode');

            invoice.style.display = 'block';

            window.print();

            invoice.style.display = 'none';
        }

        function showModal(sampleId) {
            var modal = document.createElement('div');
            modal.style.display = 'block';
            modal.style.position = 'fixed';
            modal.style.zIndex = '1000';
            modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';

            var modalContent = document.createElement('div');
            modalContent.style.backgroundColor = '#fff';
            modalContent.style.padding = '20px';
            modalContent.style.borderRadius = '5px';
            modalContent.innerHTML = `
                <p>Patient Registered. Copy ID and proceed with processing the test for result.</p>
                <p>ID: <span id="modalSampleId">${sampleId}</span></p>
                <button onclick="copyToClipboard('${sampleId}', this)">Copy</button>
                <button onclick="closeModal()">OK</button>`;
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        }

        function copyToClipboard(text, button) {
            var tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = text;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            button.innerText = 'Copied!';
            setTimeout(() => {
                button.innerText = 'Copy';
            }, 2000);
        }

        function closeModal() {
            var modal = document.querySelector('div[style*="z-index: 1000"]');
            if (modal) {
                document.body.removeChild(modal);
            }
        }

// window.onload = setNextSampleId;

async function submitUpdate() {
  const action = "updateSample";
  const staffCode = document.getElementById('updateStaffCode').value;
  const sampleId = document.getElementById('sampleId').value;
  const result = document.getElementById('result').value;
  const notes = document.getElementById('notes').value;

  // Create a form data object with all parameters
  const formDataObj = {
    action,
    staffCode,
    sampleId,
    result,
    notes
  };

  // Debugging: Log the collected form data
  console.log('Collected form data:', formDataObj);

  showLoading();

  try {
    const response = await fetch(`${serverUrl}/updateSample`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj) // Send JSON data
    });

    if (!response.ok) {
      throw new Error(`Failed to update sample. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Form submitted:', data);
    hideLoading();
    showSuccess(data.message || 'Sample updated successfully');
    document.getElementById('resultSampleModal').style.display = 'none';
    // Clear the form inputs
    document.getElementById('updateForm').reset();
  } catch (error) {
    console.error('Error:', error);
    hideLoading();
    console.log(error.message || 'Failed to update sample');
  }
}

async function submitBalanceConfirmation() {
  var form = document.getElementById('balanceForm');
  var formData = new FormData(form);b 

  try {
    const response = await fetch(`${serverUrl}/confirmBalance`, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await response.json();
    alert(data.message || 'Balance confirmed successfully');
    form.reset();
  } catch (error) {
    console.error('Error:', error);
  }
}



document.addEventListener('DOMContentLoaded', (event) => {
  let sampleData = [];
  let filteredData = [];
  let currentPage = 1;
  const rowsPerPage = 20;

  async function fetchSampleData() {
    try {
      const response = await fetch(`${serverUrl}/getSamples`);
      if (!response.ok) {
        throw new Error('Failed to fetch sample data');
      }
      const data = await response.json();
      if (data.status === 'success' && Array.isArray(data.samples)) {
        sampleData = data.samples.sort((a, b) => new Date(b['Collection Date']) - new Date(a['Collection Date']));
        filteredData = [...sampleData];
        console.log('Fetched Sample Data:', sampleData); // Debugging line
        renderPage(currentPage);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching sample data:', error);
    }
  }

  function getPageData(page) {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }

  function renderPage(page) {
    currentPage = page;
    const pageData = getPageData(page);
    renderSampleTable(pageData);
    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = currentPage === totalPages;
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
  }

  window.prevPage = function() {
    if (currentPage > 1) {
      renderPage(currentPage - 1);
    }
  }

  window.nextPage = function() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
      renderPage(currentPage + 1);
    }
  }

  function applySort() {
    const sortBy = document.getElementById('sample-sort-option').value;
    console.log('Applying Sort:', sortBy); // Debugging line

    switch (sortBy) {
      case 'name':
        filteredData.sort((a, b) => (a['Patients Name'] || '').localeCompare(b['Patients Name'] || ''));
        break;
      case 'sex':
        filteredData.sort((a, b) => (a['Sex'] || '').localeCompare(b['Sex'] || ''));
        break;
      case 'status':
        filteredData.sort((a, b) => (a['Status'] || '').localeCompare(b['Status'] || ''));
        break;
      case 'recently-added':
        filteredData.sort((a, b) => new Date(b['Collection Date']) - new Date(a['Collection Date']));
        break;
      case 'older':
        filteredData.sort((a, b) => new Date(a['Collection Date']) - new Date(b['Collection Date']));
        break;
      default:
        break;
    }

    console.log('Sorted Data:', filteredData); // Debugging line
    renderPage(1); // Render sorted data from the first page
  }

  function applyFilters() {
    const filterInput = document.getElementById('sample-search-filter').value.toLowerCase();
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    console.log('Applying Filters - Input:', filterInput, 'Start Date:', startDate, 'End Date:', endDate); // Debugging line

    filteredData = sampleData;

    if (startDate && !isNaN(startDate) && endDate && !isNaN(endDate)) {
      filteredData = filteredData.filter(sample => {
        const collectionDate = new Date(sample['Collection Date']);
        return collectionDate >= startDate && collectionDate <= endDate;
      });
    }

    if (filterInput) {
      filteredData = filteredData.filter(sample =>
        (sample['ID'] || '').toLowerCase().includes(filterInput) ||
        (sample['Patients Name'] || '').toLowerCase().includes(filterInput) ||
        (sample['Referral'] || '').toLowerCase().includes(filterInput)
      );
    }

    console.log('Filtered Data:', filteredData); // Debugging line
    renderPage(1); // Render filtered data from the first page
  }

  function renderSampleTable(data) {
    const tableBody = document.getElementById('sample-table-body');
    if (!tableBody) {
      console.error('Table body element not found');
      return;
    }
    tableBody.innerHTML = ''; // Clear existing table rows

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return;
    }

    if (data.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="21">No Result Found</td>`;
      tableBody.appendChild(row);
      return;
    }

    data.forEach((sample, index) => {
      console.log('Rendering Sample:', sample); // Debugging line

      // Ensure each field is properly handled, use 'N/A' as fallback
      const id = sample['ID'] || 'N/A';
      const sampleType = sample['Sample Type'] || 'N/A';
      const collectionDate = sample['Collection Date'] || 'N/A';
      const patient = sample['Patients Name'] || 'N/A';
      const age = sample['Age'] || 'N/A';
      const sex = sample['Sex'] || 'N/A';
      const testType = sample['Test Type'] || 'N/A';
      const emailPhone = sample['Email / Phone'] || 'N/A';
      const status = sample['Status'] || 'N/A';
      const referral = sample['Referral'] || 'N/A';
      const totalBill = sample['Total Bill (NAIRA)'] || 'N/A';
      const amountPaid = sample['Amount Paid (NAIRA)'] || 'N/A';
      const balance = sample['Balance (NAIRA)'] || 'N/A';
      const fpConfirmed = sample['FP Confirmed'] || 'N/A';
      const testResult = sample['Test Result'] || 'N/A';
      const resultFile = sample['Result File'] || 'N/A';
      const notes = sample['Notes'] || 'N/A';
      const reportDate = sample['Report Date'] || 'N/A';
      const registeredBy = sample['Registered By'] || 'N/A';
      const updatedBy = sample['Updated By'] || 'N/A';
      const confirmedBy = sample['Payment Confirmed By'] || 'N/A';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="fixed-col">${(currentPage - 1) * rowsPerPage + index + 1}</td>
        <td class="styled-patient-name">${id}</td>
        <td>${sampleType}</td>
        <td>${collectionDate}</td>
        <td>${patient}</td>
        <td>${age}</td>
        <td>${sex}</td>
        <td>${testType}</td>
        <td class="styled-email-phone"><a href="email.com" type="link">${emailPhone}</a></td>
        <td>${status}</td>
        <td>${referral}</td>
        <td class="styled-total-bill">${totalBill}</td>
        <td>${amountPaid}</td>
        <td>${balance}</td>
        <td>${fpConfirmed}</td>
        <td>${testResult}</td>
        <td>${resultFile}</td>
        <td>${notes}</td>
        <td>${reportDate}</td>
        <td>${registeredBy}</td>
        <td>${updatedBy}</td>
        <td>${confirmedBy}</td>
        <td>
          <button class="deleteBtn" onclick="deleteSample('${id}')">Delete</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  function resetFilters() {
    document.getElementById('sample-sort-option').value = 'none';
    document.getElementById('sample-search-filter').value = '';
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    filteredData = [...sampleData];
    renderPage(1);
  }

  // Event listeners for sort and filter options
  document.getElementById('sample-sort-option').addEventListener('change', applySort);
  document.getElementById('filter-sample').addEventListener('change', applyFilters);
  document.getElementById('sample-search-filter').addEventListener('keyup', applyFilters);

  // Clear the filter by sample search filter input field
  document.getElementById('sample-search-filter').addEventListener('input', (event) => {
    if (event.target.value === '') {
      resetFilters();
    }
  });

  document.getElementById('start-date').addEventListener('change', applyFilters);
  document.getElementById('end-date').addEventListener('change', applyFilters);

  // Reset filters button
  document.getElementById('reset-filters').addEventListener('click', resetFilters);

  // Pagination buttons
  document.getElementById('prevButton').addEventListener('click', prevPage);
  document.getElementById('nextButton').addEventListener('click', nextPage);

  // Initial fetch of sample data
  fetchSampleData();
});



document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('sample-table-body');

  tableBody.addEventListener('dblclick', function (event) {
    const target = event.target;

    // Ensure the clicked element is a table cell (td)
    if (target.tagName.toLowerCase() === 'td') {
      // Add the expanded class on double-click
      target.classList.toggle('expanded');
      target.style.maxWidth = target.classList.contains('expanded') ? '300px' : '';
      target.style.height = target.classList.contains('expanded') ? 'auto' : '1000px';
      target.style.position = target.classList.contains('expanded') ? 'absolute' : '';
      target.style.wordWrap = target.classList.contains('expanded') ? 'break-word' : '';
      target.style.overflow = target.classList.contains('expanded') ? 'visible' : '';
      target.style.whiteSpace = target.classList.contains('expanded') ? 'normal' : '';
      target.style.display = 'block';
    }
  });

  tableBody.addEventListener('click', function (event) {
    const target = event.target;

    // Ensure the clicked element is a table cell (td)
    if (target.tagName.toLowerCase() === 'td' && target.classList.contains('expanded')) {
      // Remove the expanded class on single-click
      target.classList.remove('expanded');
      target.style.width = '110px';
      target.style.height = '40px';
      target.style.display = 'flex';
      target.style.alignItems = 'center';
      target.style.overflow = 'hidden';
      target.style.whiteSpace = 'nowrap';
      target.style.textOverflow = 'ellipsis';
    }
  });
});


async function deleteSample(id) {
      const deleteModal = document.getElementById('deleteModal');
      const deleteModalText = document.getElementById('deleteModalText');
      const confirmDelete = document.getElementById('confirmDelete');
      const cancelDelete = document.getElementById('cancelDelete');

      deleteModalText.textContent = `Are you sure you want to delete sample with ID ${id}?`;
      deleteModal.style.display = 'block';

      return new Promise((resolve, reject) => {
        confirmDelete.onclick = async () => {
          deleteModal.style.display = 'none';
          showLoading();

          setTimeout(() => {
            hideLoading();
            showSuccess();
          }, 3000);
          hideSuccess();

          fetchSampleData();
          try {
            const response = await fetch(`${serverUrl}/deleteSample`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id })
            });

            if (!response.ok) {
              throw new Error('Failed to delete sample');
            }

            
            const data = await response.json();
            if (data.status === 'success') {
              sampleData = sampleData.filter(sample => sample.ID !== id);
              renderSampleTable(sampleData);
              resolve(data);
            } else {
              console.error('Unexpected data format:', data);
              reject(new Error('Unexpected data format'));
            }
          } catch (error) {
            console.error('Error deleting sample:', error);
            reject(error);
          }
        };

        cancelDelete.onclick = () => {
          deleteModal.style.display = 'none';
          resolve(false);
        };

        window.onclick = (event) => {
          if (event.target == deleteModal) {
            deleteModal.style.display = 'none';
            resolve(false);
          }
        };
      });
    }


 // JavaScript to handle dropdown behavior
 document.addEventListener('DOMContentLoaded', (event) => {
  const dropdown = document.querySelector('.resultDropdown');
  dropdown.addEventListener('click', function(event) {
      event.stopPropagation();
      this.querySelector('.result-dropdown-content').classList.toggle('show');
  });

  document.addEventListener('click', function() {
      const dropdownContent = document.querySelector('.result-dropdown-content');
      if (dropdownContent.classList.contains('show')) {
          dropdownContent.classList.remove('show');
      }
  });
});

