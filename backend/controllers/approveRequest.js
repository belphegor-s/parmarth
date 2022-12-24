const nodemailer = require("nodemailer");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const SVGtoPDF = require("svg-to-pdfkit");
const path = require("path");

const { createSVGWindow } = require("svgdom");
const window = createSVGWindow();
const SVG = require("svg.js")(window);
const document = window.document;

const certificate = fs
  .readFileSync(path.join(__dirname, "..", "assets", "certificate.svg"))
  .toString();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PSWD,
  },
});
const Request = require("../models/request");

exports.approveRequest = (req, res, next) => {
  const id = req.params.id;

  Request.findById(id)
    .then((data) => {
      if (!data) {
        res.status(422).json({ error: "User with this id does not exist" });
        return "user not found";
      }
      return data;
    })
    .then((data) => {
      if (data !== "user not found") {
        function toTitleCase(str) {
          return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }

        const name = toTitleCase(data.name);

        const doc = new PDFDocument({
          layout: "landscape",
          size: "A4",
        });

        const draw = SVG(document.documentElement);

        const nameSVG = draw
          .text(name)
          .size(45)
          .attr("x", "50%")
          .attr("y", "38%")
          .attr("text-anchor", "middle");

        const dateSVG = draw
          .text(
            new Date().toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          )
          .size(19)
          .attr("x", "32.5%")
          .attr("y", "82%");

        SVGtoPDF(doc, certificate);
        SVGtoPDF(doc, nameSVG.svg());
        SVGtoPDF(doc, dateSVG.svg());

        doc.pipe(fs.createWriteStream(`certificate-${data.name}.pdf`));
        doc.end();

        const details = {
          from: process.env.EMAIL,
          to: data.email,
          cc: process.env.EMAIL,
          subject: "Parmarth Certificate",
          html: `<img draggable="false" src="https://drive.google.com/uc?id=1VD0pfPT3F_iTP1BgjERkub2GA-UEmAPM" width="100px" height="100px"/><p>Hi ${name},</p><p>Your request for Parmarth Certificate generation is <strong>approved.</strong></p><p><strong>PFA</strong> for the same.</p><p>Regards,<br/>Team Parmarth</p><p><a href="https://parmarth.ietlucknow.ac.in/" target="_blank" rel="noreferrer">Parmarth Social Club</a>, IET Lucknow</p>`,
          attachments: [
            {
              path: `./certificate-${name}.pdf`,
            },
          ],
        };

        transporter.sendMail(details, (err) => {
          if (err) {
            return res.status(422).json({ error: err.message });
          } else {
            const certificatePath = path.join(
              __dirname,
              "../",
              `certificate-${name}.pdf`,
            );

            fs.unlinkSync(certificatePath, (err) => {
              if (err) {
                return res.end(err);
              } else {
                console.log("certificate deleted");
              }
            });

            return res.status(200).json({ message: "Successfully sent mail" });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};
