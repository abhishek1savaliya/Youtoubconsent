import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';

export const generatePDF = async (firstName, lastName, date) => {
    try {
        const parsedDate = moment(date);
        const formattedDate = parsedDate.format('DD/MM/YYYY hh:mm:ss A');

        const content = `
        <div id="content-to-convert" class="bg-white">
        <div class="container mx-auto px-4 py-8">
            <div class="container mx-auto p-5 header-container flex items-center">
                <a href="/" class="header-logo mr-4">
                    <img src="https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png" alt="YouTube Logo" class="w-12 h-12">
                </a>
                <span class="text-lg font-semibold mb-4">
                    <span class="text-red-500">Channel Name:</span> 
                    <a href="http://www.youtube.com/@SriKrsnaBhajananvita" class="text-teal-600">SriKrsnaBhajananvita</a>
                </span>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h1 class="text-lg font-semibold mb-4">Terms and Conditions</h1>
                <p class="mb-4 text-sm">Welcome to my channel <span class="text-teal-600"><a href="http://www.youtube.com/@SriKrsnaBhajananvita">SriKrsnaBhajananvita </a> </span>, <span class="font-bold text-orange-600">${firstName} ${lastName}</span>! By participating in our YouTube channel, you agree to comply with the following terms and conditions:</p>
                <ol class="list-decimal list-inside mb-4 ml-4">
                    <li class="mb-2 text-purple-700 text-sm">You must respect other users and the content creators in the community.</li>
                    <li class="mb-2 text-purple-700 text-sm">Any abusive or offensive behavior will not be tolerated.</li>
                    <li class="mb-2 text-purple-700 text-sm">You agree to abide by YouTube's terms of service and community guidelines.</li>
                    <li class="mb-2 text-purple-700 text-sm">Your interactions should be constructive and contribute positively to the community.</li>
                    <li class="mb-2 text-purple-700 text-sm">We reserve the right to remove any user-generated content or comments that violate these terms and conditions.</li>
                </ol>
                <p class="text-sm mb-0">By participating in our channel on ${formattedDate}, you acknowledge that you have read and understood these terms and agree to abide by them.</p>
            </div>
            <hr class="border-t border-gray-300 my-5">
        </div>
    </div>
    
        `;

        const contentElement = document.createElement('div');
        contentElement.innerHTML = content;
        document.body.appendChild(contentElement);

        const canvas = await html2canvas(contentElement);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('output.pdf');

        document.body.removeChild(contentElement);
        console.log("PDF generated successfully!");
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};
