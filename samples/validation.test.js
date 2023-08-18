/**
 * 
 * @name - Turbo Express JS
 * @package - turbo-express-js
 * @author - Mike Karypidis
 * @example - Run Something on Worker and on Master process;
 * @license - MIT
 * 
 * ============================
 * 
 * 
 * ============================
 * 
 */

const TurboExpress = require("../lib/TurboServer"); // replace this line with := const TurboExpress = require("turbo-express-js")
const RequestInterface = require("../lib/types/RequestInterface");
const ResponseInterface = require("../lib/types/ResponseInterface");

const app = new TurboExpress(1);

/**
 * @param {RequestInterface} req 
 * @param {ResponseInterface} res 
 */
async function create_user(req, res) {
  res.status(200).json({
    body: await req.body(),         // Contains all properties sent to the server
    valid_data: req.validDataObj(), // Contains only properties included in the validation schema
    files: req.files()              // Returns a list of files 
    // Files are also mentioned in the body and valid_data as: <key or property>: <attachment::random id>
  });
}

app.post("/create_user", TurboExpress.Validation({
  validations: [
    new TurboExpress.ValidationTypes.ValidationSchema(
      "email",
      [
        { name: TurboExpress.ValidationTypes.ValidationName.ISREQUIRED },
        { name: TurboExpress.ValidationTypes.ValidationName.MINLENGTH, value: 5 },
        { name: TurboExpress.ValidationTypes.ValidationName.MAXLENGTH, value: 28 },
        { name: TurboExpress.ValidationTypes.ValidationName.CONTAIN, value: "kristina" },
        { name: TurboExpress.ValidationTypes.ValidationName.NOT_CONTAIN, value: " " },
        { name: TurboExpress.ValidationTypes.ValidationName.ENDSWIDTH, value: ".com" },
        { name: TurboExpress.ValidationTypes.ValidationName.VALID_EMAIL },
      ],
      true,   // Is required?
      null,   // Default value
      "body"  // Namespace: <body, query, params, formdata>
    ),
    new TurboExpress.ValidationTypes.ValidationSchema(
      "avatar",
      [
        { name: TurboExpress.ValidationTypes.ValidationName.ATTACHMENT_REQUIRED },
        { name: TurboExpress.ValidationTypes.ValidationName.ATTACHMENT_EXTENSION, value: "jpeg" },
      ],
      true,   // Is required?
      null,   // Default value
      "body"  // Namespace: <body, query, params, formdata>
    )
  ]
}), create_user);

app.listen(5000);
