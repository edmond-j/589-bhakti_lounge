using System.Text.Json;
using System.Text.Json.Serialization;
using BhaktiLounge.Server.Models;

namespace BhaktiLounge.Server.Data.Conveters;

public class AcquisitionConverter : JsonConverter<Acquisition>
{
    public override Acquisition Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string acquisition = reader.GetString();
        if (acquisition == null)
        {
            acquisition = "Other";
        }
        return (Acquisition)Enum.Parse(typeof(Acquisition), acquisition, ignoreCase: true);
    }

    public override void Write(Utf8JsonWriter writer, Acquisition value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}