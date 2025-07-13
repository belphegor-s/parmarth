const nodemailer = require("nodemailer");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const SVGtoPDF = require("svg-to-pdfkit");
const path = require("path");
const toTitleCase = require("../util/titleCaseConverter");
const Certificate = require("../models/certificate");
const EventVolunteer = require("../models/eventVolunteers");

const { createSVGWindow } = require("svgdom");
const window = createSVGWindow();
const SVG = require("svg.js")(window);
const document = window.document;

const certificate = fs
  .readFileSync(path.join(__dirname, "..", "assets", "certificate.svg"))
  .toString();

const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PSWD,
  },
});
const Request = require("../models/request");

exports.approveRequest = async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await Request.findById(id);
    if (data) {
      const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
      });

      const draw = SVG(document.documentElement);

      const { purpose } = data;

      if (purpose === "event") {
        try {
          const eventData = await EventVolunteer.findOne({
            name: data.name,
            rollNumber: data.rollNumber,
          });

          const { branch, academicYear, certificateNumber } = eventData;

          const name = toTitleCase(eventData.name);
          const responsibility = toTitleCase(eventData.responsibility);

          const nameSVG = draw
            .text(name)
            .size(45)
            .attr("x", "50%")
            .attr("y", "42%")
            .attr("text-anchor", "middle");

          const branchSVG = draw
            .text(branch)
            .size(20)
            .attr("x", "50%")
            .attr("y", "55%")
            .attr("text-anchor", "middle");

          const responsibilitySVG = draw
            .text(responsibility.toString())
            .size(20)
            .attr("x", "60%")
            .attr("y", "55%")
            .attr("text-anchor", "middle");

          const academicYearSVG = draw
            .text(academicYear.toString() + "-")
            .size(16)
            .attr("x", "65%")
            .attr("y", "10%")
            .attr("text-anchor", "middle");

          const certificateNumberSVG = draw
            .text(certificateNumber.toString())
            .size(16)
            .attr("x", "70%")
            .attr("y", "10%")
            .attr("text-anchor", "middle");

          SVGtoPDF(doc, certificate);
          SVGtoPDF(doc, nameSVG.svg());
          SVGtoPDF(doc, branchSVG.svg());
          SVGtoPDF(doc, responsibilitySVG.svg());
          SVGtoPDF(doc, academicYearSVG.svg());
          SVGtoPDF(doc, certificateNumberSVG.svg());

          doc.pipe(fs.createWriteStream(`certificate-${name}.pdf`));
          doc.end();

          const certificatePath = path.join(
            __dirname,
            "../",
            `certificate-${name}.pdf`,
          );

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
              const certificateData = new Certificate({
                name: data.name.trim().toUpperCase(),
                email: data.email.trim(),
                branch: data.branch.trim(),
                rollNumber: +data.rollNumber,
                purpose: data.purpose.trim(),
                certificateNumber: certificateNumber,
                event: data.event,
              });

              certificateData
                .save()
                .then(() => {
                  console.log("Added Data");
                })
                .catch((err) => {
                  console.log(err);
                });

              fs.unlinkSync(certificatePath, (err) => {
                if (err) {
                  return res.end(err);
                } else {
                  console.log("certificate deleted");
                }
              });

              return res
                .status(200)
                .json({ message: "Successfully sent mail" });
            }
          });
        } catch (e) {
          return res.status(422).json({ error: e.message });
        }
      } else {
        const nameSVG = draw
          .text(data.name)
          .size(45)
          .attr("x", "50%")
          .attr("y", "38%")
          .attr("text-anchor", "middle");

        const certificateNumber = Math.floor(
          Math.pow(10, 15 - 1) + Math.random() * 9 * Math.pow(10, 15 - 1),
        );

        SVGtoPDF(doc, certificate);
        SVGtoPDF(doc, nameSVG.svg());

        doc.pipe(fs.createWriteStream(`certificate-${data.name}.pdf`));
        doc.end();

        const certificatePath = path.join(
          __dirname,
          "../",
          `certificate-${data.name}.pdf`,
        );

        const details = {
          from: process.env.EMAIL,
          to: data.email,
          cc: process.env.EMAIL,
          subject: "Parmarth Certificate",
          html: `<img draggable="false" src="https://drive.google.com/uc?id=1VD0pfPT3F_iTP1BgjERkub2GA-UEmAPM" width="100px" height="100px"/><p>Hi ${data.name},</p><p>Your request for Parmarth Certificate generation is <strong>approved.</strong></p><p><strong>PFA</strong> for the same.</p><p>Regards,<br/>Team Parmarth</p><p><a href="https://parmarth.ietlucknow.ac.in/" target="_blank" rel="noreferrer">Parmarth Social Club</a>, IET Lucknow</p>`,
          attachments: [
            {
              path: `./certificate-${data.name}.pdf`,
            },
          ],
        };

        try {
          const certificateData = Certificate.findOne({
            name: data.name,
            email: data.email,
            branch: data.branch,
            rollNumber: data.rollNumber,
            purpose: data.purpose,
            ...(data.purpose === "general" && {
              postHolded: data.postHolded,
            }),
            ...(data.purpose === "event" && { event: data.event }),
          });

          if (certificateData && typeof certificateData === "object") {
            fs.unlinkSync(certificatePath, (err) => {
              if (err) {
                return res.end(err);
              } else {
                console.log("certificate deleted");
              }
            });

            return res.status(422).json({
              error: "Certificate already issued with same data",
            });
          } else {
            transporter.sendMail(details, (err) => {
              if (err) {
                return res.status(422).json({ error: err.message });
              } else {
                const certificateData = new Certificate({
                  name: data.name.trim().toUpperCase(),
                  email: data.email.trim(),
                  branch: data.branch.trim(),
                  rollNumber: +data.rollNumber,
                  purpose: data.purpose.trim(),
                  certificateNumber: certificateNumber,
                  ...(data.purpose === "general" && {
                    postHolded: data.postHolded,
                  }),
                  ...(data.purpose === "event" && { event: data.event }),
                });

                certificateData
                  .save()
                  .then(() => {
                    console.log("Added Data");
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                fs.unlinkSync(certificatePath, (err) => {
                  if (err) {
                    return res.end(err);
                  } else {
                    console.log("certificate deleted");
                  }
                });

                return res
                  .status(200)
                  .json({ message: "Successfully sent mail" });
              }
            });
          }
        } catch (e) {
          return res.status(422).json({ error: e.message });
        }
      }
    }
  } catch (e) {
    return res.status(422).json({ error: e.message });
  }
};
