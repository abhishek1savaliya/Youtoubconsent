import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';

export const generatePDF = async (firstName, lastName, date) => {
    try {
        const parsedDate = moment(date);
        const formattedDate = parsedDate.format('DD/MM/YYYY hh:mm:ss A');

        const content = `
        <div id="content-to-convert" class="bg-white" style="background-color: #ffffff;">
            <div class="container mx-auto px-4 py-8">
                <div class="container mx-auto p-5 header-container" style="margin: 0 auto; padding: 20px;">
                    <a class="header-logo" href="/" style="text-decoration: none; color: #FF0000; display: inline-block; margin-bottom: 10px;">
                        <img src="./logo.webp" alt="YouTube Logo" class="w-10 h-10 header-logo" style="width: 50px; height: 50px;">
                    </a>
                    <span class="text-lg font-semibold mb-4" style="font-weight: 600; margin-bottom: 1rem;">
                        <span style="color: #FF0000;">Channel Name:</span> 
                        <a href="http://www.youtube.com/@SriKrsnaBhajananvita" style="color: #009688;">SriKrsnaBhajananvita</a>
                    </span>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md" style="background-color: #ffffff; padding: 24px; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h1 class="text-lg font-semibold mb-4" style="font-weight: 600; margin-bottom: 1rem;">Terms and Conditions</h1>
                    <p class="mb-4" style="font-size: 0.875rem; margin-bottom: 1rem;">Welcome to my channel <span style="color: #009688;"><a href="http://www.youtube.com/@SriKrsnaBhajananvita">SriKrsnaBhajananvita </a> </span>, <span style="font-weight: bold; color: #FF5733;">${firstName} ${lastName}</span>! By participating in our YouTube channel, you agree to comply with the following terms and conditions:</p>
                    <ol class="list-decimal list-inside mb-4" style="list-style-type: decimal; margin-bottom: 1rem; margin-left: 1rem;">
                        <li class="mb-2" style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #673AB7;">You must respect other users and the content creators in the community.</li>
                        <li class="mb-2" style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #673AB7;">Any abusive or offensive behavior will not be tolerated.</li>
                        <li class="mb-2" style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #673AB7;">You agree to abide by YouTube's terms of service and community guidelines.</li>
                        <li class="mb-2" style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #673AB7;">Your interactions should be constructive and contribute positively to the community.</li>
                        <li class="mb-2" style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #673AB7;">We reserve the right to remove any user-generated content or comments that violate these terms and conditions.</li>
                    </ol>
                    <p style="font-size: 0.875rem; margin-bottom: 0;">By participating in our channel on ${formattedDate}, you acknowledge that you have read and understood these terms and agree to abide by them.</p>
                </div>
                <hr style="border-top: 1px solid #ccc; margin-top: 20px; margin-bottom: 20px;">
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
