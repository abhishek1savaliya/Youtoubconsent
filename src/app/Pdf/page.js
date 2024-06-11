import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';

export const generatePDF = (firstName, lastName, date) => {
    const parsedDate = moment(date);
    const formattedDate = parsedDate.format('DD/MM/YYYY hh:mm:ss A');
    const content = `
    <div id="content-to-convert" class="bg-white font-sans leading-normal tracking-normal">
    <header class="text-gray-700 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
              
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/768px-YouTube_full-color_icon_%282017%29.svg.png?20240107144800" alt="YouTube Logo" class="w-10 h-10" />
                <span class="ml-3 text-xl">SriKrsnaBhajananvita</span>
            </a>
        </div>
    </header>
    <main class="container mx-auto px-4 py-8">
        <div class="bg-white p-6 rounded-lg shadow-md"> 
            <h1 class="text-2xl font-semibold mb-4">Terms and Conditions</h1>
            <p class="mb-4">
                Welcome to SriKrsnaBhajananvita, ${firstName} ${lastName}! By participating in our YouTube channel, you agree to comply with the following terms and conditions:
            </p>
            <ol class="list-decimal list-inside mb-4">
                <li class="mb-2">You must respect other users and the content creators in the community.</li>
                <li class="mb-2">Any abusive or offensive behavior will not be tolerated.</li>
                <li class="mb-2">You agree to abide by YouTube's terms of service and community guidelines.</li>
                <li class="mb-2">Your interactions should be constructive and contribute positively to the community.</li>
                <li class="mb-2">We reserve the right to remove any user-generated content or comments that violate these terms and conditions.</li>
            </ol>
            <p>By participating in our channel on ${formattedDate}, you acknowledge that you have read and understood these terms and agree to abide by them.</p>
            <p class="mt-4">For any questions or concerns regarding these terms and conditions, please contact us at abhisheksavaliya000@outlook.com.</p>
        </div>
    </main>
    <footer class="bg-gray-800 text-white text-center py-4">
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
