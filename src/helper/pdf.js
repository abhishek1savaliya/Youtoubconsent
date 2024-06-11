import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';

export const generatePDF = (firstName, lastName, date) => {
    const parsedDate = moment(date);
    const formattedDate = parsedDate.format('DD/MM/YYYY hh:mm:ss A');
    const content = `
    <div id="content-to-convert" class="bg-white">
        <style>
            /* Additional CSS for A4 size layout */
            @page {
                size: A4;
                margin: 20mm;
            }

            /* Additional CSS for consent section */
            .consent-section {
                border-top: 1px solid #ccc;
                padding-top: 20px;
                margin-top: 20px;
            }
        </style>
        <header class="text-gray-700">
            <div class="container mx-auto p-5">
                <a class="flex items-center text-gray-900" href="/" style="text-decoration: none; color: #374151;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/768px-YouTube_full-color_icon_%282017%29.svg.png?20240107144800" alt="YouTube Logo" class="w-10 h-10" style="width: 40px; height: 40px;">
                    <span class="ml-3 text-xl font-bold" style="margin-left: 12px; font-size: 1.25rem; font-weight: 700;">SriKrsnaBhajananvita</span>
                </a>
            </div>
        </header>
        <main class="container mx-auto px-4 py-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h1 class="text-2xl font-semibold mb-4" style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Terms and Conditions</h1>
                <p class="mb-4" style="margin-bottom: 1rem;">Welcome to SriKrsnaBhajananvita! By participating in our YouTube channel, you agree to comply with the following terms and conditions:</p>
                <ol class="list-decimal list-inside mb-4" style="list-style-type: decimal; margin-bottom: 1rem; margin-left: 1rem;">
                    <li class="mb-2" style="margin-bottom: 0.5rem;">You must respect other users and the content creators in the community.</li>
                    <li class="mb-2" style="margin-bottom: 0.5rem;">Any abusive or offensive behavior will not be tolerated.</li>
                    <li class="mb-2" style="margin-bottom: 0.5rem;">You agree to abide by YouTube's terms of service and community guidelines.</li>
                    <li class="mb-2" style="margin-bottom: 0.5rem;">Your interactions should be constructive and contribute positively to the community.</li>
                    <li class="mb-2" style="margin-bottom: 0.5rem;">We reserve the right to remove any user-generated content or comments that violate these terms and conditions.</li>
                </ol>
                <p style="margin-bottom: 0;">By participating in our channel, you acknowledge that you have read and understood these terms and agree to abide by them.</p>
        
            </div>
        </main>
        <footer class="bg-gray-800 text-white text-center py-4" style="background-color: #374151; color: #ffffff; text-align: center; padding-top: 1rem; padding-bottom: 1rem;">
            <p>&copy; 2024 SriKrsnaBhajananvita. All rights reserved.</p>
        </footer>
    </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = content;
    document.body.appendChild(container);


    html2canvas(container)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let position = 0;
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save('terms_and_conditions.pdf');

            container.style.display = 'none';

        })
        .catch((error) => {
            console.error('Error generating PDF:', error);
        });
};